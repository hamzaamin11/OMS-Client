import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { BiArrowFromTop } from "react-icons/bi";

type columT = {
  id: string;
  title: string;
};

type projectT = {
  id: string;
  projectName: string;
  status: string;
};

type columDataT = {
  colum: columT;
  allProject: projectT[] | undefined;
};

// 👇 Draggable project card component
const DraggableProjectCard = ({ project }: { project: projectT }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: project.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-gray-100 rounded-md shadow-md hover:bg-gray-200 cursor-pointer px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-medium">{project.projectName}</span>
        <BiArrowFromTop className="text-xl text-gray-600 hover:text-indigo-500 transition" />
      </div>
    </div>
  );
};

// 👇 Droppable column component
export const Columns = ({ colum, allProject }: columDataT) => {
  const { setNodeRef } = useDroppable({
    id: colum.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full max-w-md h-96 bg-white mt-4 rounded-lg shadow-lg overflow-y-auto p-4 relative"
    >
      <h1
        className={`text-center text-lg font-semibold  text-white p-3 rounded-md sticky top-0 z-10 ${
          (colum.id === "newProject" && "bg-indigo-500") ||
          (colum.id === "working" && "bg-orange-400") ||
          (colum.id === "complete" && "bg-green-500")
        }`}
      >
        {colum.title}
      </h1>

      <div className="space-y-3 mt-4">
        {allProject?.map((project) => (
          <DraggableProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
