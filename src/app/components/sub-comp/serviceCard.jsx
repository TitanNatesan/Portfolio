export default function ServiceCard({ services }) {
    return (
        <article>
            <div className="flex flex-wrap justify-center gap-10 mt-10">
                {services.map((service, index) => (
                    <div key={index} className=" w-[90%] card flex items-center justify-between p-8 border rounded-lg shadow-lg ">
                        <div className="w-[70%] ">
                            <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                            <p className="text-gray-400 text-left">{service.descp}</p>
                        </div>
                        {service.icon}
                    </div>
                ))}
            </div>
        </article>
    );
}