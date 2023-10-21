export default function PostImage({ key, Image }) {
  return (
    <div key={key} className="flex items-center flex-col transition ease-in-out hover:scale-105">
      <img className="h- w-full rounded-sm" src={Image} alt="postedImg" />
    </div>
  );
}
