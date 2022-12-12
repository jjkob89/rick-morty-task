import { Character } from "../types/appTypes";
import { ReactComponent as AliveIcon } from "../assets/alive.svg";
import { ReactComponent as DeadIcon } from "../assets/death.svg";
import { ReactComponent as UnknownIcon } from "../assets/unknown.svg";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../rtk/storeHooks";

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
    const [optChecked, setOptChecked] = useState<boolean>(checked);
    const currentPage = useAppSelector((state) => {
        return state.mainReducer.currentPage;
    });

    useEffect(() => {
        setOptChecked(false);
    }, [currentPage]);

    const isAlive = (): boolean => {
        if (status.toLowerCase() === "dead") return false;
        else return true;
    };

    const setChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptChecked(event.target.checked);
    };

    useEffect(() => {
        setOptChecked(checked);
    }, [checked]);

    return (
        <tr className={isAlive() ? "row" : "row row-dead"}>
            <td className="col-sel">
                <input
                    type="checkbox"
                    checked={optChecked}
                    onChange={setChecked}
                />
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
