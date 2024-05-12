import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Test = ({ ...field }) => {
    // return <Input {...field} value="asdasd" />;
    return (
        <div>
            <input {...field}></input>
        </div>
    );
};

export default Test;
