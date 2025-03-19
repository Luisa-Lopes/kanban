import PropTypes from "prop-types";
import { Card } from "../Card/Card";

export const Column = (props) => {
    const { element, upload, setUpload } = props;

    return (
        <div className="bg-[#D8D9DA] block h-full min-w-[290px] w-[90%] box-content mx-auto ">
            <h1 className="text-center">{element.title}</h1>
            <Card />
        </div>
    );
};

Column.propTypes = {
    element: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.number,
        border: PropTypes.bool,
        primaryColor: PropTypes.number,
        secondaryColor: PropTypes.string,
    }),
    upload: PropTypes.bool,
    setUpload: PropTypes.bool,
};
