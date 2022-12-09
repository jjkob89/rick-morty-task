import { Character } from "../types/appTypes";
import { ReactComponent as AliveIcon } from "../assets/alive.svg";
import { ReactComponent as DeadIcon } from "../assets/death.svg";
import { ReactComponent as UnknownIcon } from "../assets/unknown.svg";

const CharacterTile = ({
    checked,
    id,
    name,
    status,
    species,
    gender,
    origin,
    image,
}: Character) => {
    const isAlive = (): boolean => {
        if (status.toLowerCase() === "dead") return false;
        else return true;
    };

    return (
        <tr className={isAlive() ? "row" : "row row-dead"}>
            <td className="col-sel">
                <input type="checkbox" />
            </td>
            <td className="col-character">
                <div
                    className={
                        isAlive() ? "character-cont" : "character-cont-dead"
                    }
                >
                    <span>{name}</span>
                    <span>{species}</span>
                </div>
            </td>
            <td className="col-avatar">
                <img src={image}></img>
            </td>
            <td
                className={
                    origin.name === "unknown"
                        ? "col-origin-unknown"
                        : isAlive()
                        ? "col-origin"
                        : "col-origin-dead"
                }
            >
                {origin.name}
            </td>
            <td className={isAlive() ? "col-gender" : "col-gender-dead"}>
                {gender}
            </td>
            <td
                className={
                    status === "unknown" ? "col-status-unknown" : "col-status"
                }
            >
                <div className="col-status-flex">
                    {(status.toLowerCase() === "alive" && <AliveIcon />) ||
                        (status.toLowerCase() === "dead" && <DeadIcon />) ||
                        (status.toLowerCase() === "unknown" && <UnknownIcon />)}
                    <span>{status}</span>
                </div>
            </td>
        </tr>
    );
};

export default CharacterTile;
