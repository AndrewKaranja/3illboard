import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import { db } from "../firebase";
import { withProtected } from "../hooks/route";
import { useRouter } from "next/router";
import { ErrorMessage, useField, Formik, Form, Field } from "formik";
// import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { LoadingOverlay, Affix, Notification } from "@mantine/core";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
// import { collection, doc, addDoc,query, where,setDoc,serverTimestamp  } from "firebase/firestore";

function Enquire() {
  const { user } = useAuth();
  const router = useRouter();
  const userChatRef = collection(db, "chats");
  const { owneremail, listingID, ownerID, billboardTitle, requestedPeriod } =
    router.query;
  const chatsQuery = query(
    userChatRef,
    where("users", "array-contains", user?.email)
  );
  const [chatsSnapshot] = useCollectionOnce(chatsQuery);
  const [visible, setVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const chatAlreadyExists = (recepientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recepientEmail)?.length > 0
    );

  const validate = Yup.object({
    message: Yup.string()
      .min(5, "Must be atleast 5 characters")
      .max(100, "Must be 50 characters or less")
      .required("Message is required"),
    fname: Yup.string()
      .min(4, "Must be atleast 4 characters")
      .required("Fullname is required"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });
  const [MessageInfo, setMessageInfo] = useState([]);
  return (
    <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto   inset-0 ">
      <Head>
        <title>Enquire</title>
        <meta name="description" content="A billboard marketplace" />
        <link rel="icon" href="/3illboardLogoMini.ico" />
      </Head>
      <div className="relative w-auto my-5 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white ">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">Ready to Book?</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => router.back()}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-2 text-slate-500 text-lg leading-relaxed">
              Enter your contact details, and we will let the ad manager know
              you want to submit an application. If they are interested, they
              will contact you with next steps.
            </p>
            <LoadingOverlay visible={visible} />

            {isOwner && (
              <Affix position={{ bottom: 20, right: 20 }}>
                <Notification title="Wait a minute" color="yellow">
                  Seems like you own this listing
                </Notification>
              </Affix>
            )}

            <Formik
              initialValues={{
                message: "",
                fname: "",
                email: "",
                phone: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                setVisible(true);

                setMessageInfo({
                  fname: values.fname,
                  message: values.message,
                  email: values.email,
                  phone: values.phone,
                });

                const clientMessage = `Hello ${owneremail},${values.fname} 
                           is inquiring about your Listing http://3illboard.com/account/listings/${listingID} 
                           availability from ${requestedPeriod} . Additional message:${values.message}`;

                if (
                  user?.email !== owneremail &&
                  !chatAlreadyExists(owneremail)
                ) {
                  const promises = [];
                  // const batch = writeBatch(db);

                  const chatRef = await addDoc(collection(db, "chats"), {
                    users: [user.email, owneremail],
                    lastMessage: clientMessage,
                    lastMessageTime: serverTimestamp(),
                    lastSender: user?.email,
                  });
                  // setChatRefID(chatRef.id) ;
                  promises.push(chatRef);

                  const messagesCollectionRef = collection(
                    db,
                    `chats/${chatRef.id}/messages`
                  );
                  const requestCollectionRef = collection(
                    db,
                    `users/${ownerID}/requests`
                  );
                  const userDocRef = doc(db, "users", user.uid);

                  const messageDoc = await addDoc(messagesCollectionRef, {
                    timestamp: serverTimestamp(),
                    message: clientMessage,
                    user: user.email,
                  });
                  promises.push(messageDoc);
                  const requestDoc = await addDoc(requestCollectionRef, {
                    fname: values.fname,
                    message: values.message,
                    email: values.email,
                    phone: values.phone,
                    requestedPeriod: requestedPeriod,
                    listingid: listingID,
                    chatid: chatRef.id,
                    listingTitle: billboardTitle,
                    requestTime: serverTimestamp(),
                  });
                  promises.push(requestDoc);

                  const userDoc = await setDoc(
                    userDocRef,
                    { lastSeen: serverTimestamp(), phone: values.phone },
                    { merge: true }
                  );
                  promises.push(userDoc);

                  Promise.all(promises)
                    .then(() => {
                      router.push(`/account/messages/${chatRef.id}`);
                    })
                    .catch((err) => console.log(err));
                } else if (user?.email === owneremail) {
                  setIsOwner(true);
                } else {
                  const promises = [];

                  const chatRef = chatsSnapshot?.docs.find((chat) =>
                    chat.data().users.find((user) => user === owneremail)
                  );

                  const messagesCollectionRef = collection(
                    db,
                    `chats/${chatRef.id}/messages`
                  );
                  const requestCollectionRef = collection(
                    db,
                    `users/${ownerID}/requests`
                  );
                  const userDocRef = doc(db, "users", user.uid);
                  const messageDoc = await addDoc(messagesCollectionRef, {
                    timestamp: serverTimestamp(),
                    message: clientMessage,
                    user: user.email,
                  });
                  promises.push(messageDoc);
                  const chatDocRef = doc(db, "chats", chatRef.id);
                  const chatDoc = await setDoc(
                    chatDocRef,
                    {
                      lastMessage: clientMessage,
                      lastMessageTime: serverTimestamp(),
                      lastSender: user.email,
                    },
                    { merge: true }
                  );
                  promises.push(chatDoc);
                  const requestDoc = await addDoc(requestCollectionRef, {
                    fname: values.fname,
                    message: values.message,
                    email: values.email,
                    phone: values.phone,
                    requestedPeriod: requestedPeriod,
                    listingid: listingID,
                    chatid: chatRef.id,
                    listingTitle: billboardTitle,
                    requestTime: serverTimestamp(),
                  });
                  promises.push(requestDoc);
                  const userDoc = await setDoc(
                    userDocRef,
                    { lastSeen: serverTimestamp(), phone: values.phone },
                    { merge: true }
                  );
                  promises.push(userDoc);

                  Promise.all(promises)
                    .then(() => {
                      router.push(`/account/messages/${chatRef.id}`);
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              {(formik) => (
                <div>
                  <Form>
                    <div className=" p-1">
                      <div>
                        <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 ">
                          Message
                          <p className="text-[0.5rem] lowercase">
                            (Ask questions)
                          </p>
                        </div>
                        <div className="w-full flex-1 mx-2">
                          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <textarea
                              name="message"
                              id="message"
                              placeholder="You may enter some of your specification"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                              onChange={formik.handleChange}
                              value={formik.values.message}
                              rows={4}
                              cols={5}
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="message"
                            className="text-red-600"
                          />
                        </div>

                        <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">
                          First and Last Name
                        </div>
                        <div className="w-full flex-1 mx-2">
                          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <Field
                              id="fname"
                              name="fname"
                              placeholder="Your names"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="fname"
                            className="text-red-600"
                          />
                        </div>

                        <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">
                          Email
                        </div>
                        <div className="w-full flex-1 mx-2">
                          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <Field
                              name="email"
                              placeholder="email"
                              type="email"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="email"
                            className="text-red-600"
                          />
                        </div>

                        <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">
                          Phone
                        </div>
                        <div className="w-full flex-1 mx-2">
                          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <PhoneInput
                              name="phone"
                              id="phone"
                              inputProps={{
                                name: "phone",
                                required: true,
                                autoFocus: true,
                              }}
                              country={"ke"}
                              value={formik.values.phone}
                              onChange={formik.handleChange("phone")}
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            name="phone"
                            className="text-red-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => router.back()}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Send Request
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>

            <p className="my-2 text-slate-500 text-xs">
              You agree to 3illboard Terms of Use and Privacy Policy. By
              choosing to contact an adlister, you also agree that 3illboard, ad
              owners, and ad managers may call or text you about any inquiries
              you submit through our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(Enquire);
