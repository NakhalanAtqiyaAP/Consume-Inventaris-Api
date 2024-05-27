export default function Card({ judul,content }) {
    return (
        <> 
        <h1 className="text-4xl font-extrabold dark:text-white ">{judul}</h1>
        <p className="mt-10 mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"> {content}</p>
        </>
       
    )
}
