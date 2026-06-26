"use client";
import Loading from '@/components/Loading';
import { getUserSession } from '@/lib/core/session';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { User, Mail, Image as ImageIcon, Sparkles, FileText, Save, Edit3, X } from 'lucide-react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); 
    const [formData, setFormData] = useState({ name: '', email: '', image: '', skills: '', bio: '' });

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            try {
                const data = await getUserSession();
                const userFound = data?.user || data;
                if (userFound) {
                    setUser(userFound);
                    setFormData({
                        name: userFound.name || '',
                        email: userFound.email || '',
                        image: userFound.image || '',
                        skills: userFound.skills || '',
                        bio: userFound.bio || ''
                    });
                }
            } catch (error) {
                console.error("Failed to load user:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/users/${formData.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                toast.success("Profile updated!");
                setUser({ ...user, ...formData }); 
                setIsEditing(false); 
            } else {
                toast.error("Update failed.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loading/></div>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 bg-[#0d0d0e] rounded-3xl border border-zinc-800 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition">
                        <Edit3 size={15} /> Edit Profile
                    </button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Left Side: Information Card */}
                <div className="w-full md:w-1/3 flex flex-col items-center border border-zinc-800 rounded-3xl p-6 bg-black">
                    <div className="w-24 h-24 rounded-full border-4 border-purple-500 overflow-hidden mb-4">
                        <img src={user?.image || "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-lg font-bold text-white">{user?.name}</h2>
                    <p className="text-zinc-400 text-xs mt-1">{user?.email}</p>
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-[10px] mt-3 uppercase font-bold tracking-wider">
                        {user?.role || 'Collaborator'}
                    </span>
                    <div className="mt-4 text-center">
                        <p className="text-zinc-500 text-xs">Skills:</p>
                        <p className="text-white text-sm font-medium">{user?.skills || 'Not specified'}</p>
                    </div>
                </div>

                {/* Right Side: Edit Form (Visible only when isEditing is true) */}
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-bold">Edit Information</h3>
                            <button type="button" onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white"><X size={20}/></button>
                        </div>
                       
                        <input className="w-full p-2 bg-black border border-zinc-700 rounded-lg text-white text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Name" />
                        <input className="w-full p-2 bg-black border border-zinc-700 rounded-lg text-zinc-500 text-sm cursor-not-allowed" value={formData.email} disabled />
                        <input className="w-full p-2 bg-black border border-zinc-700 rounded-lg text-white text-sm" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="Image URL" />
                        <input className="w-full p-2 bg-black border border-zinc-700 rounded-lg text-white text-sm" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="Skills" />
                        <textarea className="w-full p-2 bg-black border border-zinc-700 rounded-lg text-white text-sm h-20" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Bio" />
                        
                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition">
                            <Save size={15} /> Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="w-full md:w-2/3 text-zinc-400 text-sm p-6 border border-zinc-800 rounded-2xl">
                        <h3 className="text-white font-bold mb-3">About Me</h3>
                        <p>{user?.bio || "No bio available."}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;