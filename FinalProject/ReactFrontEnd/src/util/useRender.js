import {useState} from "react";

export default function useRender() {


    const [,setRefresh] = useState(false);
    const render = (bool) => {
        setRefresh(bool);
    }

    return {
        render: render
    }

}