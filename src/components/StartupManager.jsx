// 'use client';

// import React, { useState } from 'react';
// import { Form, TextField, TextArea, Button, Label, Input, Card, Chip, Image } from "@heroui/react";

// export default function StartupManager() {
//   const [startup, setStartup] = useState(null); // null if no startup exists
//   const [isEditing, setIsEditing] = useState(false);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const logoFile = formData.get("logo");

//     // 1. Upload to ImgBB
//     const imgbbFormData = new FormData();
//     imgbbFormData.append("image", logoFile);
    
//     const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
//       method: "POST",
//       body: imgbbFormData,
//     });
//     const result = await res.json();

//     // 2. Save data to your database
//     const newStartup = {
//       name: formData.get("name"),
//       logo: result.data.url,
//       industry: formData.get("industry"),
//       description: formData.get("description"),
//       funding: formData.get("funding"),
//       email: formData.get("email"),
//     };

   
    
//     setStartup(newStartup);
//     setIsEditing(false);
//   };

//   if (startup && !isEditing) {
//     return (
//       <div className="max-w-3xl">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Startup</h1>
//           <div className="flex gap-2">
//             <Button variant="flat" onPress={() => setIsEditing(true)}>Edit</Button>
//             <Button variant="flat" color="danger" onPress={() => setStartup(null)}>Delete</Button>
//           </div>
//         </div>
//         <Card className="p-6">
//           <div className="flex gap-4 items-center">
//             {/* <Image src={startup.logo} className="w-16 h-16 rounded-xl" /> */}
//             <div>
//               <h2 className="text-xl font-bold">{startup.name}</h2>
//               <div className="flex gap-2 mt-2">
//                 <Chip size="sm" color="primary">{startup.industry}</Chip>
//                 <Chip size="sm" variant="flat">{startup.funding}</Chip>
//               </div>
//             </div>
//           </div>
//           <p className="mt-4 text-gray-600">{startup.description}</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-2xl font-bold mb-6">Create Startup</h1>
//       <Card className="p-6">
//         <Form onSubmit={handleCreate} className="gap-4">
//           <TextField name="name" label="Startup Name" isRequired />
          
//           <div className="flex flex-col gap-2">
//             <Label>Logo Image</Label>
//             <Input type="file" name="logo" accept="image/*" isRequired />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <TextField name="industry" label="Industry" isRequired />
//             <TextField name="funding" label="Funding Stage" isRequired />
//           </div>

//           <TextField name="email" label="Founder Email" type="email" isRequired />
          
//           <TextArea name="description" label="Description" isRequired />

//           <Button type="submit" color="primary" className="w-full">
//             {startup ? "Update Startup" : "Create Startup"}
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// }