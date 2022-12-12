import { Character, TableData } from "../types/appTypes";
import CharacterTile from "./CharacterTile";
import { useState, useEffect } from "react";
import { useAppSelector } from "../rtk/storeHooks";

const CharacterTable = ({ currentData, globalSelect }: TableData) => {
    const [globalSelected, setGlobalSelected] = useState<boolean>(false);
    const [cData, setCData] = useState<Character[] | undefined>(currentData);
    const currentPage = useAppSelector((state) => {
        return state.mainReducer.currentPage;
    });
    useEffect(() => {
        setCData(currentData);
    }, [currentData]);

    useEffect(() => {
        setGlobalSelected(false);
        globalSelect(false);
    }, [currentPage]);

    const triggerGlobalSelectEvent = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setGlobalSelected(event.target.checked);
        globalSelect(event.target.checked);
    };

    return (
        <div className="data-table-container">
            <table className="data-table">
                <tbody>
                    <tr className="row-header">
                        <th className="col-sel">
                            <input
                                onChange={triggerGlobalSelectEvent}
                                checked={globalSelected}
                                type="checkbox"
                            ></input>
                        </th>
                        <th className="col-name">Name</th>
                        <th className="col">Avatar</th>
                        <th className="col">Origin</th>
                        <th className="col">Gender</th>
                        <th className="col">Status</th>
                    </tr>
                    {cData &&
                        cData.map((item, index) => (
                            <CharacterTile
                                key={index}
                                checked={item.checked}
                                id={item.id}
                                name={item.name}
                                status={item.status}
                                species={item.species}
                                gender={item.gender}
                                origin={item.origin}
                                image={item.image}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CharacterTable;
