const HomeCard = (props) => {
  // Combine the original className with any additional className from props
  const baseClasses = 'absolute flex flex-col gap-2 p-4 w-58 h-66 bg-white justify-center items-center pointer-events-auto';
  // If props.className is provided, append it to the baseClasses
  const combinedClasses = props.className ? `${baseClasses} ${props.className}` : baseClasses;
  
  return (
    <div className={combinedClasses}>
      <div className="w-54 h-54 ">
        <img src={`/assets/${props.cover}.jpg`} alt={props.genre} className="w-full h-full object-cover" />
      </div>
      <div className="font-semibold">{props.genre}</div>
    </div>
  );
};

export default HomeCard;
