
import './tool-wrapper.css';

interface ToolsIconWrapperProps {
  svg: string;
  onClick?: () => void;
}


export const ToolsIconWrapper: React.FC<ToolsIconWrapperProps> = ({ svg, onClick = () => null }) => {

  return (
    <div className="tool-icon" onMouseDown={onClick}>
      <img src={svg} alt="Tool palette tool" />
    </div>
  )

}