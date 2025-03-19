import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const Card = (props) => {
    /* const { element, upload, setUpload, url } = props;
    const [data, setData] = useState([]);

    const getData = async (titulo) => {
        let results = await fetchData();

        switch (titulo) {
            case "A fazer":
                setData(results.Do);
                break;
            case "Em andamento":
                setData(results.Progress);
                break;
            case "Concluído":
                setData(results.Concluded);
                break;
        }
    };

    useEffect(() => {
        console.log(upload);
        getData(element.title);
        setUpload(false);
    }, [element.title, upload, setUpload]);

    var divStyle = {
        background: element.primaryColor,
    };

    var borderBottom = {
        borderBottom: ` 3px solid ${element.secondaryColor}`,
    };

    var borderRight = {
        borderRight: ` 3px solid ${element.secondaryColor}`,
    };

    return (
        <div>
            {data.length != 0 &&
                data.map((value) => {
                    return (
                        <div
                            key={value.id}
                            style={divStyle}
                            className={`my-4 mx-2 p-2 rounded-md h-32 relative  text-white`}
                        >
                            <button
                                type="button"
                                className="absolute top-0 right-0 p-2"
                                onClick={() => (
                                    handleDelete(value.id, url), setUpload(true)
                                )}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                            <h1 className="text-center " style={borderBottom}>
                                {value.title}
                            </h1>
                            <section className="grid grid-cols-2 h-20 place-content-center font-light">
                                <div
                                    className=" h-full flex flex-col justify-around"
                                    style={borderRight}
                                >
                                    <div className="grid grid-cols-5 py-1 ">
                                        <img
                                            src={value.image}
                                            className="w-6 h-6 rounded-2xl col-start-1 col-end-2 my-auto"
                                        />
                                        <h3 className="px-2 col-start-2 col-end-6 text-center">
                                            {value.name}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <i className="bi bi-calendar3 text-[#0d0303] px-1 col-start-1 col-end-2"></i>
                                        <h6 className="px-2  col-start-2 col-end-6 mx-auto">
                                            {value.formattedDate || value.date}
                                        </h6>
                                    </div>
                                </div>
                                <p className="p-2 w-full break-words overflow-y-auto">
                                    {value.description}
                                </p>
                            </section>
                        </div>
                    );
                })}
        </div>
    );*/
};

Card.propTypes = {
    element: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.number,
        border: PropTypes.bool,
        primaryColor: PropTypes.number,
        secondaryColor: PropTypes.number,
    }),
    upload: PropTypes.string,
    setUpload: PropTypes.bool,
    color: PropTypes.number,
    url: PropTypes.string,
};
