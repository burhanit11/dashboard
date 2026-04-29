import { memo, useState } from 'react'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import useStore from '../store/useStore'

const EditorPanel = memo(function EditorPanel() {
  const selectedProject = useStore((s) => s.selectedProject)
  const submitNote = useStore((s) => s.submitNote)
  const noteSubmitting = useStore((s) => s.noteSubmitting)
  const noteSuccess = useStore((s) => s.noteSuccess)
  const noteError = useStore((s) => s.noteError)
  const [noteText, setNoteText] = useState('')

  if (!selectedProject) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center min-h-[160px] animate-[fadeIn_0.3s_ease-out]">
        <p className="text-slate-400 text-sm text-center">
          Select a project to view details and add notes
        </p>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!noteText.trim()) return
    submitNote({
      projectId: selectedProject.id,
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
    })
    setNoteText('')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-start gap-4 mb-5 pb-5 border-b border-slate-100">
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#e8edf2]">
          <img
            src={selectedProject.avatar}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#1a8cff] m-0 mb-1">
            {selectedProject.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed m-0">
            {selectedProject.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-slate-700">Add a note</label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your notes about this project..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm resize-none transition-colors focus:outline-none focus:border-[#1a8cff] placeholder:text-slate-300"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={noteSubmitting || !noteText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a8cff] text-white text-sm font-semibold rounded-xl border-none cursor-pointer transition-all duration-200 hover:bg-[#0066dd] hover:shadow-[0_4px_12px_rgba(26,140,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <FaPaperPlane size={12} />
            {noteSubmitting ? 'Submitting...' : 'Submit Note'}
          </button>

          {noteSuccess && (
            <span className="flex items-center gap-1.5 text-green-500 text-sm font-medium animate-[fadeInScale_0.3s_ease-out]">
              <FaCheckCircle size={14} />
              Note saved!
            </span>
          )}

          {noteError && (
            <span className="text-red-500 text-sm">{noteError}</span>
          )}
        </div>
      </form>
    </div>
  )
})

export default EditorPanel
