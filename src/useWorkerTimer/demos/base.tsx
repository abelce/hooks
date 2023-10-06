import { useState } from "react";
import useWorkerTimer from "..";

export default () => {

    const [state, setState] = useState(false);

    useWorkerTimer(() => {
        setState(true);
    }, 1000)

    return <div>
        {state ? "计时中" : "计时结束"}
    </div>
}