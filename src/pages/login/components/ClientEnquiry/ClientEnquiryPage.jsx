import React, { useState, useEffect } from "react";
import {
    Mail, Clock, User, Phone, MessageSquare, Trash2,
    Search, Filter, ChevronDown, XCircle, CheckCircle,
    Download, Star, Eye, Reply, Copy, Check,
    Calendar, MapPin, Briefcase, Globe, Send, FileText,
    Tag, Bookmark, MoreHorizontal, AlertCircle,
    ArrowUpDown, DownloadCloud, Printer, RefreshCw
} from "lucide-react";
import { FaFacebook as Facebook, FaXTwitter as Twitter, FaLinkedin as Linkedin, FaInstagram as Instagram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import { db } from "../../../../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

const ClientEnquiryPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("client-enquiry");
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        const q = query(collection(db, "Client Enquiry"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setEnquiries(items);
            filterAndSortEnquiries(items, searchTerm, selectedType, sortConfig);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        filterAndSortEnquiries(enquiries, searchTerm, selectedType, sortConfig);
    }, [searchTerm, selectedType, sortConfig, enquiries]);

    const filterAndSortEnquiries = (items, search, type, sort) => {
        let filtered = [...items];

        // Search filter
        if (search) {
            filtered = filtered.filter(item =>
                item.name?.toLowerCase().includes(search.toLowerCase()) ||
                item.email?.toLowerCase().includes(search.toLowerCase()) ||
                item.phone?.includes(search) ||
                item.message?.toLowerCase().includes(search.toLowerCase()) ||
                item.application?.toLowerCase().includes(search.toLowerCase()) ||
                item.company?.toLowerCase().includes(search.toLowerCase()) ||
                item.location?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Type filter
        if (type !== "all") {
            filtered = filtered.filter(item => item.application === type);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue = a[sort.key];
            let bValue = b[sort.key];

            if (sort.key === 'timestamp') {
                aValue = a.timestamp?.toDate?.() || 0;
                bValue = b.timestamp?.toDate?.() || 0;
            }

            if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredEnquiries(filtered);
    };

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            setIsLoggingOut(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            try {
                await deleteDoc(doc(db, "Client Enquiry", id));
                showNotification('Enquiry deleted successfully', 'success');
            } catch (error) {
                console.error("Error deleting enquiry:", error);
                showNotification('Error deleting enquiry', 'error');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;

        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} enquiries?`)) {
            try {
                await Promise.all(selectedItems.map(id => deleteDoc(doc(db, "Client Enquiry", id))));
                setSelectedItems([]);
                showNotification(`${selectedItems.length} enquiries deleted successfully`, 'success');
            } catch (error) {
                console.error("Error deleting enquiries:", error);
                showNotification('Error deleting enquiries', 'error');
            }
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        showNotification('Copied to clipboard', 'success');
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const getApplicationTypes = () => {
        const types = new Set(enquiries.map(e => e.application || 'General'));
        return ['all', ...Array.from(types)];
    };

    const exportToCSV = () => {
        const data = filteredEnquiries.map(item => ({
            Name: item.name,
            Email: item.email,
            Phone: item.phone,
            Application: item.application || 'General',
            Message: item.message,
            Company: item.company || 'N/A',
            Location: item.location || 'N/A',
            Date: item.timestamp?.toDate?.().toLocaleString() || 'N/A'
        }));

        const csv = [
            Object.keys(data[0]).join(','),
            ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <ReserchLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            isLoading={isLoggingOut}
        >
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                {/* Notification */}
                {notification.show && (
                    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slideIn ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                        {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-medium">{notification.message}</span>
                    </div>
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedEnquiry && (
                    <EnquiryDetailModal
                        enquiry={selectedEnquiry}
                        onClose={() => setShowDetailModal(false)}
                        onDelete={handleDelete}
                        onCopy={handleCopy}
                        copiedId={copiedId}
                    />
                )}

                <div className="p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-800">
                                    Client <span className="text-[#0b3470]">Enquiries</span>
                                </h1>
                                <p className="text-slate-500 mt-2 flex items-center gap-2">
                                    <Mail size={16} />
                                    View and manage all client enquiries
                                    <span className="px-2 py-1 bg-[#0b3470]/10 text-[#0b3470] rounded-full text-xs font-semibold">
                                        {filteredEnquiries.length} total
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-600"
                                >
                                    <DownloadCloud size={18} />
                                    <span className="text-sm font-medium">Export CSV</span>
                                </button>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${showFilters
                                        ? 'bg-[#0b3470] text-white'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Filter size={18} />
                                    <span className="text-sm font-medium">Filters</span>
                                    <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-6 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, company, location, or message..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b3470] focus:border-transparent"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <XCircle size={18} />
                                </button>
                            )}
                        </div>

                        {/* Filters */}
                        {showFilters && (
                            <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">
                                            Application Type
                                        </label>
                                        <select
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b3470]"
                                        >
                                            {getApplicationTypes().map(type => (
                                                <option key={type} value={type}>
                                                    {type === 'all' ? 'All Types' : type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">
                                            Sort By
                                        </label>
                                        <select
                                            value={`${sortConfig.key}-${sortConfig.direction}`}
                                            onChange={(e) => {
                                                const [key, direction] = e.target.value.split('-');
                                                setSortConfig({ key, direction });
                                            }}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b3470]"
                                        >
                                            <option value="timestamp-desc">Newest First</option>
                                            <option value="timestamp-asc">Oldest First</option>
                                            <option value="name-asc">Name A-Z</option>
                                            <option value="name-desc">Name Z-A</option>
                                            <option value="email-asc">Email A-Z</option>
                                            <option value="email-desc">Email Z-A</option>
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            onClick={() => {
                                                setSelectedType('all');
                                                setSearchTerm('');
                                                setSortConfig({ key: 'timestamp', direction: 'desc' });
                                            }}
                                            className="px-4 py-2 text-[#0b3470] hover:bg-[#0b3470]/5 rounded-lg transition-all font-medium"
                                        >
                                            <RefreshCw size={16} className="inline mr-2" />
                                            Reset Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bulk Actions */}
                        {selectedItems.length > 0 && (
                            <div className="mt-4 bg-slate-50 border border-[#0b3470]/20 rounded-xl p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-[#0b3470]" />
                                    <span className="font-medium text-[#0b3470]">
                                        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleBulkDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Delete Selected
                                    </button>
                                    <button
                                        onClick={() => setSelectedItems([])}
                                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-100 border-t-[#0b3470]"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-[#0b3470] animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ) : filteredEnquiries.length === 0 ? (
                        <EmptyState searchTerm={searchTerm} />
                    ) : (
                        <div className="space-y-4">
                            {filteredEnquiries.map((enquiry) => (
                                <EnquiryCard
                                    key={enquiry.id}
                                    enquiry={enquiry}
                                    isSelected={selectedItems.includes(enquiry.id)}
                                    onSelect={() => {
                                        if (selectedItems.includes(enquiry.id)) {
                                            setSelectedItems(selectedItems.filter(id => id !== enquiry.id));
                                        } else {
                                            setSelectedItems([...selectedItems, enquiry.id]);
                                        }
                                    }}
                                    onDelete={() => handleDelete(enquiry.id)}
                                    onView={() => {
                                        setSelectedEnquiry(enquiry);
                                        setShowDetailModal(true);
                                    }}
                                    onCopy={() => handleCopy(enquiry.email, enquiry.id)}
                                    copiedId={copiedId}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </ReserchLayout>
    );
};

// Enhanced Enquiry Card Component
const EnquiryCard = ({ enquiry, isSelected, onSelect, onDelete, onView, onCopy, copiedId }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-white rounded-xl border transition-all hover:shadow-lg ${isSelected ? 'border-[#0b3470] ring-2 ring-[#0b3470]/20' : 'border-slate-200 hover:border-[#0b3470]/30'
            }`}>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={onSelect}
                            className="w-4 h-4 rounded border-slate-300 text-[#0b3470] focus:ring-[#0b3470]"
                        />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#0b3470] to-[#144485] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                {enquiry.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">{enquiry.name}</h3>
                                <p className="text-xs text-slate-500">ID: {enquiry.id.slice(-8)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="px-3 py-1 bg-[#0b3470]/10 text-[#0b3470] rounded-full text-xs font-semibold">
                            {enquiry.application || "General"}
                        </span>
                        <button
                            onClick={onView}
                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                        >
                            <Eye size={18} />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all lg:hidden"
                        >
                            <ChevronDown size={18} className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`p-4 ${expanded ? '' : 'lg:block'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Contact Info - 3 columns */}
                    <div className="lg:col-span-3 space-y-2">
                        <DetailItem
                            icon={<Mail size={16} />}
                            label="Email"
                            value={enquiry.email}
                            onCopy={() => onCopy(enquiry.email)}
                            copied={copiedId === enquiry.id}
                        />
                        <DetailItem
                            icon={<Phone size={16} />}
                            label="Phone"
                            value={enquiry.phone}
                            onCopy={() => onCopy(enquiry.phone)}
                            copied={copiedId === enquiry.id}
                        />
                        {enquiry.company && (
                            <DetailItem icon={<Briefcase size={16} />} label="Company" value={enquiry.company} />
                        )}
                        {enquiry.location && (
                            <DetailItem icon={<MapPin size={16} />} label="Location" value={enquiry.location} />
                        )}
                    </div>

                    {/* Message - 6 columns */}
                    <div className="lg:col-span-6">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                "{enquiry.message}"
                            </p>
                            {enquiry.message.length > 150 && (
                                <button className="mt-2 text-xs text-[#0b3470] hover:text-[#0b3470]/80 font-medium">
                                    Read More
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Meta Info - 3 columns */}
                    <div className="lg:col-span-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar size={14} />
                            <span>{enquiry.timestamp?.toDate ? enquiry.timestamp.toDate().toLocaleString() : "Recently"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock size={14} />
                            <span>Response time: <span className="text-green-600 font-medium">~2 hours</span></span>
                        </div>
                    </div>
                </div>

                {/* Additional Details (Expandable on mobile) */}
                {expanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 lg:hidden">
                        <div className="grid grid-cols-2 gap-3">
                            {enquiry.company && (
                                <DetailItem icon={<Briefcase size={14} />} label="Company" value={enquiry.company} />
                            )}
                            {enquiry.location && (
                                <DetailItem icon={<MapPin size={14} />} label="Location" value={enquiry.location} />
                            )}
                            <DetailItem icon={<Calendar size={14} />} label="Date" value={enquiry.timestamp?.toDate?.().toLocaleDateString() || "Recently"} />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer with quick actions */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-500">
                        <Tag size={12} />
                        Source: Website
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                        <Globe size={12} />
                        {enquiry.application || "General"}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-blue-500 transition-colors" title="Send email">
                        <Mail size={14} />
                    </button>
                    <button className="text-slate-400 hover:text-green-500 transition-colors" title="Call">
                        <Phone size={14} />
                    </button>
                    <button className="text-slate-400 hover:text-[#0b3470] transition-colors" title="Message">
                        <MessageSquare size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Detail Item Component
const DetailItem = ({ icon, label, value, onCopy, copied }) => (
    <div className="flex items-start gap-2 group">
        <div className="text-slate-400 mt-0.5">{icon}</div>
        <div className="flex-1">
            <p className="text-xs text-slate-500">{label}</p>
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-700">{value}</p>
                {onCopy && (
                    <button
                        onClick={onCopy}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        {copied ? (
                            <Check size={12} className="text-green-500" />
                        ) : (
                            <Copy size={12} className="text-slate-400 hover:text-slate-600" />
                        )}
                    </button>
                )}
            </div>
        </div>
    </div>
);

// Empty State Component
const EmptyState = ({ searchTerm }) => (
    <div className="bg-white rounded-2xl p-16 text-center border border-slate-200">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {searchTerm ? "No matching enquiries found" : "No enquiries yet"}
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
            {searchTerm
                ? `No results found for "${searchTerm}". Try different keywords or clear your search.`
                : "When clients submit enquiries through your website, they will appear here."
            }
        </p>
        {searchTerm && (
            <button className="mt-6 px-6 py-2 bg-[#0b3470] text-white rounded-lg hover:bg-[#0b3470]/90 transition-all font-medium">
                Clear Search
            </button>
        )}
    </div>
);

// Detail Modal Component
const EnquiryDetailModal = ({ enquiry, onClose, onDelete, onCopy, copiedId }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Enquiry Details</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-all"
                >
                    <XCircle size={20} className="text-slate-400" />
                </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
                {/* Client Profile */}
                <div className="bg-gradient-to-r from-slate-50 to-[#0b3470]/5 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#0b3470] to-[#144485] rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                            {enquiry.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{enquiry.name}</h3>
                            <p className="text-sm text-slate-500">Client ID: {enquiry.id}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 bg-white text-[#0b3470] rounded-full text-xs font-semibold shadow-sm">
                                    {enquiry.application || "General Enquiry"}
                                </span>
                                <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-xs shadow-sm">
                                    {enquiry.timestamp?.toDate?.().toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                            <Mail size={16} />
                            Email Address
                        </h4>
                        <div className="flex items-center justify-between">
                            <p className="text-slate-700">{enquiry.email}</p>
                            <button
                                onClick={() => onCopy(enquiry.email)}
                                className="p-2 hover:bg-white rounded-lg transition-all"
                            >
                                {copiedId === enquiry.id ? (
                                    <Check size={16} className="text-green-500" />
                                ) : (
                                    <Copy size={16} className="text-slate-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                            <Phone size={16} />
                            Phone Number
                        </h4>
                        <div className="flex items-center justify-between">
                            <p className="text-slate-700">{enquiry.phone}</p>
                            <button
                                onClick={() => onCopy(enquiry.phone)}
                                className="p-2 hover:bg-white rounded-lg transition-all"
                            >
                                {copiedId === enquiry.id ? (
                                    <Check size={16} className="text-green-500" />
                                ) : (
                                    <Copy size={16} className="text-slate-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {enquiry.company && (
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                <Briefcase size={16} />
                                Company
                            </h4>
                            <p className="text-slate-700">{enquiry.company}</p>
                        </div>
                    )}

                    {enquiry.location && (
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                <MapPin size={16} />
                                Location
                            </h4>
                            <p className="text-slate-700">{enquiry.location}</p>
                        </div>
                    )}
                </div>

                {/* Message */}
                <div className="bg-slate-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                        <MessageSquare size={16} />
                        Message
                    </h4>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {enquiry.message}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-500">Submitted</p>
                        <p className="text-sm font-medium text-slate-700">
                            {enquiry.timestamp?.toDate?.().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                        <p className="text-xs text-slate-500">Time</p>
                        <p className="text-sm font-medium text-slate-700">
                            {enquiry.timestamp?.toDate?.().toLocaleTimeString()}
                        </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-500">Source</p>
                        <p className="text-sm font-medium text-slate-700">Website</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="text-sm font-medium text-green-600">New</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0b3470] text-white rounded-xl hover:bg-[#0b3470]/90 transition-all font-medium shadow-md">
                        <Reply size={18} />
                        Reply via Email
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium">
                        <Phone size={18} />
                        Call Client
                    </button>
                    <button className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all">
                        <Send size={18} />
                    </button>
                    <button
                        onClick={() => {
                            onDelete(enquiry.id);
                            onClose();
                        }}
                        className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Social Links (if available) */}
                {(enquiry.FacebookIcon || enquiry.twitter || enquiry.linkedin) && (
                    <div className="flex items-center gap-2 pt-2">
                        <span className="text-sm text-slate-500">Social:</span>
                        {enquiry.FacebookIcon && (
                            <a href={enquiry.FacebookIcon} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-all">
                                <Facebook size={16} className="text-blue-600" />
                            </a>
                        )}
                        {enquiry.twitter && (
                            <a href={enquiry.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-all">
                                <Twitter size={16} className="text-blue-400" />
                            </a>
                        )}
                        {enquiry.linkedin && (
                            <a href={enquiry.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-all">
                                <Linkedin size={16} className="text-blue-700" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default ClientEnquiryPage;