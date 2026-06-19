"use client";

import { 
  Card, Button, Input, TextArea, 
  Select, Label, ListBox 
} from "@heroui/react";
import { Picture } from "@gravity-ui/icons";
import { useState } from "react";

export default function MyStartupPage() {
  const [startup, setStartup] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("logo");

    let logoUrl = profileImage; 
    if (file && file.size > 0) {
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", file);
      
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
          method: "POST",
          body: imgbbFormData,
        });
        const result = await res.json();
        if (result.success) {
          logoUrl = result.data.url;
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    setStartup({
      name: formData.get("name"),
      logo: logoUrl,
      industry: formData.get("industry"),
      funding: formData.get("funding"),
      description: formData.get("description"),
      email: formData.get("email"),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // বানান ঠিক করা হয়েছে
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">My Startup</h1>
        <p className="text-gray-500 mb-6">Create and manage your startup profile.</p>

        {startup ? (
          // View Mode (Profile)
          <Card>
           <Card.Header className="flex gap-4 p-6">
      {/* <img> ট্যাগ ব্যবহার করুন */}
      <img src={startup.logo} className="w-16 h-16 rounded-xl object-cover" alt="logo" />
      <div className="flex flex-col">
        <Card.Title className="text-2xl font-bold">{startup.name}</Card.Title>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{startup.industry}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{startup.funding}</span>
                </div>
              </div>
            </Card.Header>
            <Card.Content className="px-6 pb-6 text-gray-600">
              {startup.description}
            </Card.Content>
            <Card.Footer className="flex justify-end gap-2 p-6 border-t">
              <Button variant="flat" onPress={() => setStartup(null)}>Delete</Button>
              <Button color="primary">Edit</Button>
            </Card.Footer>
          </Card>
        ) : (
          // Create Mode (Form)
          <Card>
            <Card.Header className="p-6 border-b">
              <Card.Title className="text-2xl font-semibold">+ Create Startup</Card.Title>
            </Card.Header>
            <Card.Content className="p-6">
              <form onSubmit={handleCreate} className="flex flex-col">
                    <Label className="pb-2">Startup Name</Label>
                    <Input name="name" label="Startup Name *" placeholder="e.g. TechNova" required />
                
                {/* Profile Image Section */}
                <div className="space-y-1.5 pt-4">
                  <Label>Profile Image</Label>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 border overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <Picture className="text-gray-400 min-h-5 min-w-5" />
                      )}
                    </div>
                    <label className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border px-4 font-medium text-purple-600 hover:bg-gray-50 transition text-sm">
                      Upload Logo
                      <input type="file" name="logo" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
               
                    
                <div className="grid grid-cols-2 gap-4 mt-4 space-y-4">
                  <Select name="industry">
                    <Label className="pb-2">Industry *</Label>
                    <Select.Trigger><Select.Value placeholder="Select industry" /></Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item key="tech"><Label>Technology</Label></ListBox.Item>
                        <ListBox.Item key="fintech"><Label>Fintech</Label></ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select name="funding">
                    <Label className="pb-2">Funding Stage *</Label>
                    <Select.Trigger><Select.Value placeholder="Select stage" /></Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item key="seed"><Label>Seed</Label></ListBox.Item>
                        <ListBox.Item key="series-a"><Label>Series A</Label></ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
                
                <Label className="pb-2">Enter your Email</Label>
                <Input name="email" label="Founder Email *" type="email" placeholder="example@mail.com" required />
                <Label className="pb-2 mt-4">Description</Label>
                <TextArea name="description" label="Description *" placeholder="Describe your mission..." required />
                
                <Button type="submit" className={'bg-purple-600 mt-6 w-full'} size="lg">
                  Create Startup
                </Button>
              </form>
            </Card.Content>
            <Card.Footer />
          </Card>
        )}
      </div>
    </div>
  );
}













// "use client";

// import React, { useState } from "react";
// import { Card, Button, Input, Chip } from "@heroui/react";
// import { PencilToSquare, TrashBin } from "@gravity-ui/icons";
// import StartupManager from "@/components/StartupManager";

// export default function MyStartupPage() {
//     const [startup, setStartup] = useState({
//         name: "AI Core",
//         industry: "AI/ML",
//         stage: "Seed",
//         status: "Approved",
//         description: "AI Core is building a decentralized model hosting platform for high-performance AI inference and serverless training workflows."
//     });

//     return (
//         <div className="p-10 min-h-screen text-white">
//             <div className="max-w-4xl mx-auto">

//                 {/* Header Section with Edit/Delete */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div>
//                         <h1 className="text-3xl font-bold">My <span className="text-purple-500">Startup</span></h1>
//                         <p className="text-gray-400 pt-1">
//                             Create and edit your startup profile at any time.
//                         </p>
//                     </div>
//                     <div className="flex gap-4">
//                         <Button className={'bg-purple-500'} variant="outline"><PencilToSquare /> Edit</Button>
//                         <Button variant="danger-soft"><TrashBin /> Delete</Button>
//                     </div>
//                 </div>

//                 <StartupManager/>

              
//                 <Card className="mb-10 border-gray-800">
//                     <Card.Header className="flex flex-row items-center gap-4 pb-4">
//                         <div className="size-16 bg-purple-900 rounded-xl flex items-center justify-center">Logo</div>
//                         <div>
//                             <Card.Title className="text-2xl font-bold">{startup.name}</Card.Title>
//                             <div className="flex gap-2 mt-2">
//                                 <Chip size="sm" color="secondary">{startup.industry}</Chip>
//                                 <Chip size="sm" variant="flat">{startup.stage}</Chip>
//                                 <Chip size="sm" color="success" variant="flat">{startup.status}</Chip>
//                             </div>
//                         </div>
//                     </Card.Header>
//                     <Card.Content className="px-6 pb-6 text-gray-400">
//                         {startup.description}
//                     </Card.Content>
//                     <Card.Footer />
//                 </Card>
//             </div>
//         </div>
//     );
// }