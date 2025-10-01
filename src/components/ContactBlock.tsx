

export default function ContactBlock({ data }: { data: any }) {
    return (
        <div key={data._id}>
            <h2>{data.title}</h2>
            <p>{data.email}</p>
        </div>
    );
}
