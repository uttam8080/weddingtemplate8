import React from "react";
import { Heart, Edit3, Eye, Trash2, PlusCircle, ArrowLeft } from "lucide-react";
import { DiyaSvg } from "./DecorativeSvg";

export const SavedCardsManager = ({
  cards,
  onSelectEdit,
  onPreviewCard,
  onDeleteCard,
  onCreateNew,
  onBackToHome,
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2196F3]/30 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-full bg-[#0D47A1] text-[#90CAF9] hover:bg-[#1565C0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
              My Saved Invitations
            </h2>
          </div>
        </div>

        <button
          onClick={onCreateNew}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2196F3] via-[#90CAF9] to-[#2196F3] text-[#0D47A1] font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Invitation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl border-2 border-[#90CAF9] overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0D47A1]">
                <img
                  src={card.coverImageUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#0D47A1]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#0D47A1]/70 line-clamp-1 italic font-cormorant mt-0.5">
                    "{card.weddingQuote}"
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#90CAF9]/40">
                  <button
                    onClick={() => onPreviewCard(card)}
                    className="flex-1 py-2 rounded-xl bg-[#E3F2FD] border border-[#2196F3] text-[#0D47A1] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#2196F3] hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>

                  <button
                    onClick={() => onSelectEdit(card)}
                    className="flex-1 py-2 rounded-xl bg-[#0D47A1] text-[#90CAF9] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#1565C0] hover:text-white transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteCard(card.id)}
                    className="p-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50"
                    title="Delete Card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-[#2196F3] p-8 space-y-4">
            <Heart className="w-12 h-12 text-[#0D47A1] mx-auto opacity-50" />
            <h3 className="font-cinzel text-xl font-bold text-[#0D47A1]">
              No saved invitations yet
            </h3>
            <p className="text-sm text-[#0D47A1]/80 max-w-md mx-auto">
              Start crafting your royal invitation for your upcoming wedding or celebration.
            </p>
            <button
              onClick={onCreateNew}
              className="px-6 py-2.5 rounded-full bg-[#0D47A1] text-[#90CAF9] text-xs font-bold shadow-lg"
            >
              Create Invitation Now
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
