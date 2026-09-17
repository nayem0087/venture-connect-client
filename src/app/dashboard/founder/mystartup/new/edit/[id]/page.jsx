// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import {
//     Form,
//     TextField,
//     Label,
//     Input,
//     TextArea,
//     Select,
//     ListBox,
//     Button,
// } from 'react-aria-components';
// import { Pencil, FloppyDisk, ArrowUpFromSquare } from '@gravity-ui/icons';
// import { getStartupById, updateStartup } from '@/app/actions/startupActions';

// export default function EditStartupPage() {
//     const router = useRouter();
//     const params = useParams();
//     const { id } = params;

//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [logoPreview, setLogoPreview] = useState(null);

//     const [formData, setFormData] = useState({
//         name: '',
//         industry: '',
//         funding: '',
//         email: '',
//         description: '',
//     });

//     useEffect(() => {
//         const fetchStartup = async () => {
//             const data = await getStartupById(id);
//             setFormData({
//                 name: data.name || '',
//                 industry: data.industry || '',
//                 funding: data.funding || '',
//                 email: data.email || '',
//                 description: data.description || '',
//             });
//             if (data.logo) setLogoPreview(data.logo);
//             setLoading(false);
//         };
//         fetchStartup();
//     }, [id]);

//     const handleLogoChange = (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setLogoPreview(URL.createObjectURL(file));
//             // NOTE: actual file upload to storage (e.g. Cloudinary/S3) needs to be
//             // wired up separately -- this only handles the local preview for now.
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);

//         const payload = {
//             ...formData,
//             // status is intentionally left out -- backend hardcodes it to "pending"
//         };

//         await updateStartup(id, payload);
//         setSaving(false);
//         router.push('/dashboard/startups'); // adjust to your actual listing route
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-[400px] text-zinc-400">
//                 Loading...
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-2xl mx-auto bg-[#141416] border border-zinc-800 rounded-2xl p-8">
//             <div className="flex items-center gap-2 mb-6">
//                 <Pencil className="w-5 h-5 text-zinc-300" />
//                 <h1 className="text-lg font-semibold text-white">Edit Startup</h1>
//             </div>

//             <Form onSubmit={handleSubmit} className="space-y-6">
//                 <TextField
//                     name="name"
//                     value={formData.name}
//                     onChange={(value) => setFormData({ ...formData, name: value })}
//                     className="flex flex-col gap-1"
//                 >
//                     <Label className="text-zinc-400 text-sm">
//                         Startup Name <span className="text-purple-500">*</span>
//                     </Label>
//                     <Input
//                         placeholder="e.g. TechNova"
//                         className="bg-[#1c1c1e] h-12 rounded-lg px-3 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         required
//                     />
//                 </TextField>

//                 <div className="flex flex-col gap-1">
//                     <Label className="text-zinc-400 text-sm">Logo Image</Label>
//                     <div className="flex items-center gap-4">
//                         <div className="w-14 h-14 rounded-lg bg-[#1c1c1e] border border-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
//                             {logoPreview ? (
//                                 // eslint-disable-next-line @next/next/no-img-element
//                                 <img
//                                     src={logoPreview}
//                                     alt="Logo preview"
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <span className="text-zinc-600 text-xs">No logo</span>
//                             )}
//                         </div>
//                         <label className="flex-1 h-12 bg-[#1c1c1e] rounded-lg border border-zinc-800 border-dashed flex items-center justify-center gap-2 text-zinc-400 text-sm cursor-pointer hover:bg-[#232325] hover:text-zinc-200 transition-colors">
//                             <ArrowUpFromSquare className="w-4 h-4" />
//                             Upload Logo
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleLogoChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <Select
//                         name="industry"
//                         selectedKey={formData.industry}
//                         onSelectionChange={(key) =>
//                             setFormData({ ...formData, industry: key })
//                         }
//                         className="w-full flex flex-col gap-1"
//                     >
//                         <Label className="text-zinc-400 text-sm">
//                             Industry <span className="text-purple-500">*</span>
//                         </Label>
//                         <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3 text-white border border-zinc-800 flex items-center justify-between">
//                             <Select.Value />
//                         </Select.Trigger>
//                         <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
//                             <ListBox>
//                                 <ListBox.Item id="tech" className="text-zinc-200 px-2 py-1.5 rounded hover:bg-purple-700/30 cursor-pointer">
//                                     Technology
//                                 </ListBox.Item>
//                                 <ListBox.Item id="e-commerce" className="text-zinc-200 px-2 py-1.5 rounded hover:bg-purple-700/30 cursor-pointer">
//                                     E-commerce
//                                 </ListBox.Item>
//                             </ListBox>
//                         </Select.Popover>
//                     </Select>

//                     <Select
//                         name="funding"
//                         selectedKey={formData.funding}
//                         onSelectionChange={(key) =>
//                             setFormData({ ...formData, funding: key })
//                         }
//                         className="w-full flex flex-col gap-1"
//                     >
//                         <Label className="text-zinc-400 text-sm">
//                             Funding Stage <span className="text-purple-500">*</span>
//                         </Label>
//                         <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3 text-white border border-zinc-800 flex items-center justify-between">
//                             <Select.Value />
//                         </Select.Trigger>
//                         <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
//                             <ListBox>
//                                 <ListBox.Item id="seed" className="text-zinc-200 px-2 py-1.5 rounded hover:bg-purple-700/30 cursor-pointer">
//                                     Seed
//                                 </ListBox.Item>
//                                 <ListBox.Item id="pro-seed" className="text-zinc-200 px-2 py-1.5 rounded hover:bg-purple-700/30 cursor-pointer">
//                                     Pro-seed
//                                 </ListBox.Item>
//                             </ListBox>
//                         </Select.Popover>
//                     </Select>
//                 </div>

//                 <TextField
//                     name="email"
//                     value={formData.email}
//                     onChange={(value) => setFormData({ ...formData, email: value })}
//                     className="flex flex-col gap-1"
//                 >
//                     <Label className="text-zinc-400 text-sm">
//                         Founder Email <span className="text-purple-500">*</span>
//                     </Label>
//                     <Input
//                         type="email"
//                         className="bg-[#1c1c1e] h-12 rounded-lg px-3 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         required
//                     />
//                 </TextField>

//                 {/* status is fixed -- not shown as an editable field, hardcoded server-side */}
//                 <input type="hidden" name="status" value="pending" />

//                 <TextField
//                     name="description"
//                     value={formData.description}
//                     onChange={(value) =>
//                         setFormData({ ...formData, description: value })
//                     }
//                     className="flex flex-col gap-1"
//                 >
//                     <Label className="text-zinc-400 text-sm">
//                         Description <span className="text-purple-500">*</span>
//                     </Label>
//                     <TextArea
//                         placeholder="Describe your mission..."
//                         rows={4}
//                         className="bg-[#1c1c1e] p-3 rounded-lg text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
//                         required
//                     />
//                 </TextField>

//                 <div className="flex gap-3 pt-2">
//                     <Button
//                         type="button"
//                         onPress={() => router.back()}
//                         className="flex-1 h-12 bg-[#1c1c1e] text-zinc-300 font-medium rounded-lg border border-zinc-800 hover:bg-[#232325] transition-colors"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         isDisabled={saving}
//                         className="flex-[2] h-12 bg-gradient-to-r from-purple-700 to-purple-500 font-semibold rounded-lg hover:from-purple-800 hover:to-purple-600 transition-colors text-white flex items-center justify-center gap-2 disabled:opacity-60"
//                     >
//                         <FloppyDisk className="w-4 h-4" />
//                         {saving ? 'Saving...' : 'Save Changes'}
//                     </Button>
//                 </div>
//             </Form>
//         </div>
//     );
// }