export default function Title({ name,page,Lang }) {
    return (
        <> 
        <h1 className="text-2xl font-extrabold dark:text-white ">{name}</h1>
    <div className="flex mb-4">
        <p className="text-white border-x-4 border-indigo-500 m-4 p-2">{page}</p>
        <p className="text-white border-x-4 border-red-500 m-4 p-2">{Lang}</p>
        
    </div>
</>
       
    )
}
