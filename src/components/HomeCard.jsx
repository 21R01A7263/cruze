const HomeCard = (props) => {
  return (
    <div className='flex flex-col gap-2 p-4 w-68 h-78 bg-white shadow-md rounded-lg justify-evenly items-center' >
      <div className="w-64 h-64">
        <img src={`/assets/${props.cover}.jpg`} alt={props.genre} className="w-full h-full object-cover rounded" />
      </div>
      <div className="font-semibold">{props.genre}</div>
    </div>
  );
};

export default HomeCard;
