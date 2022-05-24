import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import { useUserType } from '../../../context/UserTypeContext';
import Header from '../../../components/dashboard/Header';

function Faqs() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {userInfo}=useUserType();
    const charactersList = [
        {
          image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
          label: 'Bender Bending Rodríguez',
          description: 'Fascinated with cooking, though has no sense of taste',
          content: "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
        },
      
        {
          image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
          label: 'Carol Miller',
          description: 'One of the richest people on Earth',
          content: "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
        },
        {
          image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
          label: 'Homer Simpson',
          description: 'Overweight, lazy, and often ignorant',
          content: 'Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.',
        },
        {
          image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
          label: 'Spongebob Squarepants',
          description: 'Not just a sponge',
          content: 'SpongeBob is a childish and joyful sea sponge who lives in a pineapple with his pet snail Gary in the underwater city of Bikini Bottom. He works as a fry cook at the Krusty Krab, a job which he is exceptionally skilled at and enjoys thoroughly. ',
        },
      ]

      const items = charactersList.map((item) => (
        <Accordion.Item label={<AccordionLabel {...item} />} key={item.label}>
          <Text size="sm">{item.content}</Text>
        </Accordion.Item>
      ));
    


  return (
    <div className="flex h-screen overflow-hidden">
           {/* Sidebar */}
           
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

 {/* Content area */}
 <div className="relative bg-slate-200 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}

<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

<main>
  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
  <Accordion initialItem={-1} iconPosition="right">
      {items}
    </Accordion>
    </div>
    </main>
    </div>
    </div>
  )
}


function AccordionLabel({ label, image, description }) {
    return (
      <Group noWrap>
        <Avatar src={image} radius="xl" size="lg" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {description}
          </Text>
        </div>
      </Group>
    );
  }

export default Faqs