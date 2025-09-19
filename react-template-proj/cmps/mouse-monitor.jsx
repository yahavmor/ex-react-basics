const { useState, useEffect } = React;

export function MouseMonitor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMonitoring, setIsMonitoring] = useState(true);

    useEffect(() => {
        if (isMonitoring) {
            document.addEventListener("mousemove", updatePos);
        } else {
            document.removeEventListener("mousemove", updatePos);
        }

        return () => {
            document.removeEventListener("mousemove", updatePos);
        };
    }, [isMonitoring]);

    function updatePos(ev) {
        const { x, y } = ev;
        setMousePos({ x, y });
    }

    function onChangeMode() {
        setIsMonitoring(!isMonitoring);
    }

    function DisplayModal() {
        const mode = isMonitoring ? 'Pause' : 'Resume';
        return (
            <div className="display-modal">
                <h1>Mouse Position</h1>
                <span>x: {mousePos.x}, y: {mousePos.y}</span>
                <button className="btn-change-mode" onClick={()=>onChangeMode()}>{mode}</button>
            </div>
        );
    }

    return (
        <section className="mouse-monitor">
            <h1 className="main-header">Mouse Monitor App</h1>
            <DisplayModal />
        </section>
    );
}
