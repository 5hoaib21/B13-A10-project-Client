// "use client";

// import React, { useState } from "react";
// import { AlertDialog } from "@heroui/react";
// import { AlertTriangle, X } from "lucide-react";
// import { toast } from "react-hot-toast";

// const ReportModal = ({ promptId }) => {
//   const [reason, setReason] = useState("Inappropriate Content");
//   const [additionalDescription, setAdditionalDescription] = useState("");

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     const reportPayload = {
//       promptId,
//       reason,
//       description: additionalDescription,
//     };
//     console.log("Local Report Data Ready:", reportPayload);

//     toast.success("Report safely submitted for tracking review.");
//     setReason("Inappropriate Content");
//     setAdditionalDescription("");
//   };

//   return (
//     <div className="flex-1 min-w-[120px]">
//       <AlertDialog>
//         <AlertDialog.Trigger>
//           <button className="w-full bg-white hover:bg-zinc-50 text-zinc-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-zinc-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer">
//             <AlertTriangle size={18} className="text-zinc-400" />
//             Report
//           </button>
//         </AlertDialog.Trigger>

//         {/* ❌ REMOVED BACKDROP BLUR - Pure dynamic clear standard shade mask */}
//         <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-200" />

//         {/* 🎯 FIXED CENTER STRUCTURAL FRAME CONTAINER */}
//         <AlertDialog.Container className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden pointer-events-none">
//           <AlertDialog.Dialog className="pointer-events-auto relative w-full max-w-md bg-white border border-zinc-100 text-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-200 mx-auto my-auto">
            
//             {/* Top Right Floating Close cross Trigger */}
//             <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 p-1.5 rounded-xl transition-colors cursor-pointer">
//               <X size={16} />
//             </AlertDialog.CloseTrigger>

//             <form onSubmit={handleReportSubmit}>
//               <AlertDialog.Header className="flex items-center gap-3 pt-6 px-6 border-b border-zinc-100 pb-4">
//                 <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
//                   <AlertTriangle size={18} />
//                 </div>
//                 <AlertDialog.Heading className="text-lg font-bold text-zinc-900 tracking-tight">
//                   Report Prompt Template
//                 </AlertDialog.Heading>
//               </AlertDialog.Header>

//               <AlertDialog.Body className="py-5 px-6 space-y-4">
//                 <p className="text-xs text-zinc-500 leading-relaxed">
//                   Help us maintain community standards. If this prompt contains
//                   malicious instructions, report it below.
//                 </p>

//                 {/* Dropdown Options */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
//                     Reason
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={reason}
//                       onChange={(e) => setReason(e.target.value)}
//                       className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-700 outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all shadow-2xs"
//                     >
//                       <option value="Inappropriate Content">Inappropriate Content</option>
//                       <option value="Spam">Spam</option>
//                       <option value="Copyright Violation">Copyright Violation</option>
//                       <option value="Other">Other</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-zinc-400">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Description Input */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
//                     Additional Description (Optional)
//                   </label>
//                   <textarea
//                     value={additionalDescription}
//                     onChange={(e) => setAdditionalDescription(e.target.value)}
//                     placeholder="Provide details about the infraction..."
//                     rows={4}
//                     className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 outline-none resize-none focus:border-blue-500 transition-all shadow-2xs"
//                   />
//                 </div>
//               </AlertDialog.Body>

//               {/* 🛠️ FOOTER DESIGN: Safe inner grid system, cancel button inside code frame container */}
//               <AlertDialog.Footer className="border-t border-zinc-100 py-4 px-6 flex justify-end gap-3 bg-zinc-50/50">
//                 <AlertDialog.CloseTrigger>
//                   <button
//                     type="button"
//                     className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-800 bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
//                   >
//                     Cancel
//                   </button>
//                 </AlertDialog.CloseTrigger>

//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-colors cursor-pointer"
//                 >
//                   Submit Report
//                 </button>
//               </AlertDialog.Footer>
//             </form>
//           </AlertDialog.Dialog>
//         </AlertDialog.Container>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ReportModal;