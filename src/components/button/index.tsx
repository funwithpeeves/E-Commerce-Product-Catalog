

interface Props {
    title: string;
    type?: "submit" | "reset" | "button";
    designs?: string;
    disabled?: boolean;
    icon?: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  const Button: React.FC<Props> = ({
    title,
    type,
    designs,
    disabled,
    icon,
    handleClick,
  }) => {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`px-6 py-3 cursor-pointer bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 ${designs}`}
        type={type}
      >
        <span className="flex-1">{title}</span>
  
        {icon && <img className="w-6 h-6" src={icon} />}
      </button>
    );
  };
  
  export default Button;