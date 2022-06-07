import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react';
import { writeBatch,collection,addDoc,serverTimestamp,setDoc,doc, Firestore} from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import {useAuth} from '../../context/AuthContext'

const PaypalCheckoutButton = ({listingID}) => {
    const{user}=useAuth();
    const router=useRouter();
    const [error,setError]=useState("");
    const [paymentInfo, setPaymentInfo] = useState([]);
    const[subscriptionInfo,setSubscriptionInfo] = useState([]);

    // sb-sf7p4716731294@personal.example.com
    // 1Sk:_&ic

    // sb-zw47du16730471@business.example.com
    // 98lm^pCG
  return (
      <PayPalButtons
    createSubscription={(data, actions) => {
       
        return actions.subscription
            .create({
                plan_id: "P-3MG04974SW6538545MKPEFEI",
            })
            .then((orderId) => {
                // Your code here after create the order
                return orderId;
            });
    }}
    style={{
        label: "subscribe",
    }}
    onApprove={async (data, actions) =>  {

        setSubscriptionInfo({
            subscriptionID:data.subscriptionID,
            paymentID:data.paymentID,
            payerID:data.payerID,
            orderID:data.orderID
        })
        const listingPaymentDocRef=doc(db,`users/${user.uid}/listings/${listingID}/payments`,data?.subscriptionID);
        const listingUserDocRef=doc(db,`users/${user.uid}/listings`,listingID);
        const listingDocRef=doc(db,"listings",listingID);
        const promises=[];

        const batch = writeBatch(db);
        batch.set(listingPaymentDocRef,{subscriptionInfo,created:serverTimestamp(),status:"successful",paymentMethod:"paypal"});
        batch.update(listingUserDocRef,{subscriptionActive:true,lastPayment:serverTimestamp(),paymentStatus:"paid"});
        batch.update(listingDocRef,{subscriptionActive:true});

        const updateSubscriptionBatch=batch.commit();
        promises.push(updateSubscriptionBatch);

        Promise.all(promises)
.then(()=>{ alert('You have successfully created subscription ' + data.subscriptionID);})
.catch((err)=>console.log(err));
        // Optional message given to subscriber
      }}
    onError={(err)=>{
        console.error("err"+err);
        alert(err);
    }}
    
    />
    

    
  );
};



export default PaypalCheckoutButton