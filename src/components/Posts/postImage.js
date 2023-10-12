export default function PostImage({ followedUser, key, Images }) {
  return (
    <div key={key} className="flex items-center flex-col transition ease-in-out hover:scale-105">
      <img className="h-full w-full rounded-sm" src={Images[1]} alt="postedImg" />
    </div>
  );
}
