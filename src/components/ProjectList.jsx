import { memo, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import useStore from "../store/useStore";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const ProjectList = memo(function ProjectList() {
  const projects = useStore((s) => s.projects);
  const projectsLoading = useStore((s) => s.projectsLoading);
  const projectsError = useStore((s) => s.projectsError);
  const selectedProject = useStore((s) => s.selectedProject);
  const selectProject = useStore((s) => s.selectProject);
  const fetchProjects = useStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (projectsLoading) return <LoadingSpinner />;
  if (projectsError) return <ErrorMessage message={projectsError} onRetry={fetchProjects} />;

  return (
    <>
      {projects.map((item, index) => (
        <div key={item.id}>
          <div
            onClick={() => selectProject(item)}
            className={`
              cursor-pointer transition-all duration-200 hover:shadow-md animate-[slideInUp_0.4s_ease-out_both]

              md:bg-[#99999926] md:p-5 md:rounded-[13px] md:border md:border-gray-100

              bg-white p-6 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] md:shadow-none
              ${selectedProject?.id === item.id
                ? "border-[#0088CC] shadow-[0_4px_16px_rgba(0,136,204,0.15)]"
                : ""
              }
            `}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Desktop: avatar + title row */}
            <div className="hidden md:flex items-center gap-3 mb-1">
              <img
                src={item.avatar}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0088CC]/20"
                alt="Admin Icon"
              />
              <h3 className="text-[18px] font-[900] text-[#0088CC]">
                {item.title}
              </h3>
            </div>

            {/* Mobile: uppercase centered title */}
            <h3 className="md:hidden text-[18px] font-[900] text-[#0088CC] uppercase mb-2">
              {item.title}
            </h3>

            <p className="text-[12px] md:text-[12px] text-gray-400 font-bold leading-relaxed md:leading-tight">
              {item.description}
            </p>
          </div>

          {/* Blue down arrow between cards — mobile only */}
          {index < projects.length - 1 && (
            <div className="md:hidden flex justify-center -my-3 relative z-10">
              <div className="w-10 h-10 bg-[#0056D2] rounded-full flex items-center justify-center shadow-lg">
                <FaChevronDown className="text-white text-sm" />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
});

export default ProjectList;
