import React, { JSX, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Camera, Check, Edit2, Eye, EyeOff, KeyRound, Lock, Mail, Save, X } from 'lucide-react';
import Loader from '../components/Loader';
import { updateAppwriteEmail, updateAppwriteName } from '../lib/auth';

export default function Profile(): JSX.Element {

    const { user, userLoading, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: (user as any)?.bio || '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: (user as any).bio || '',
                password: ''
            });
        }
    }, [user]);

    if (userLoading) return <div className='h-svh flex justify-center items-center'><Loader size='larger' /></div>

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">Please log in to access your profile.</p>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        setLoading(true);
        console.log(formData)

        if (!formData.password) {
            alert("Please fill the password fields")
            setLoading(false)
            return
        }

        if (formData.email !== user.email && formData.name !== user.name) {
            try {
                const e = await updateAppwriteEmail(formData.email, formData.password);
                const n = await updateAppwriteName(formData.name);

                console.log(n)

                if (e && n) {
                    setUser(n)
                    setLoading(false)
                }

            } catch (err) {
                console.log(err)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        } else if (formData.email !== user.email && formData.name === user.name) {
            try {
                const e = await updateAppwriteEmail(formData.email, formData.password);
                console.log(e)
                if (e) {
                    setUser(e)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        } else if (formData.email === user.email && formData.name !== user.name) {
            try {
                const n = await updateAppwriteName(formData.name);
                console.log(n)
                if (n) {
                    setUser(n)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        setLoading(false);
        setIsEditing(false);
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            bio: (user as any)?.bio || '',
            password: ''
        })

    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            bio: (user as any)?.bio || '',
            password: ''
        });
        setIsEditing(false);
    };

    const formatJoinDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative">
                            <img
                                src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                                alt={user.name}
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                            />
                            <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
                            >
                                <Edit2 size={16} />
                                <span>Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader size="small" /> : <Save size={16} />}
                                    <span>Save</span>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Content */}
                <div className="pt-20 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Basic Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        rows={4}
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {(user as any).bio || 'No bio available.'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Stats & Info */}
                        <div className="space-y-6">
                            {/* Contact Info */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Joined {formatJoinDate(user.$createdAt)}
                                        </span>
                                    </div>
                                </div>
                                {isEditing &&
                                    <div className='mt-10'>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



{/* Password */ }



{/* Activity Stats */ }
{/* <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Activity
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Posts Published</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">12</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Total Views</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">2.4K</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Followers</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">156</span>
                                    </div>
                                </div>
</div> */}