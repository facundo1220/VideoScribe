import VideoCoverList from "./VideoCoverList";

function MyvideosList({ content }) {
  return (
    <tr className="border-b">
      <td className="text-sm text-white font-light px-20 py-4 whitespace-nowrap">
        {<VideoCoverList content={content} />}
      </td>
      <td className="text-sm text-white font-light px-20 py-4 whitespace-nowrap">
        {content.privacy}
      </td>
      <td className="text-sm text-white font-light px-20 py-4 whitespace-nowrap">
        {content.category.map((category) => category + "  ")}
      </td>
      <td className="text-sm text-white font-light px-20 py-4 whitespace-nowrap">
        {content.date}
      </td>
    </tr>
  );
}

export default MyvideosList;
