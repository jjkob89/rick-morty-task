import { TableData } from "../types/appTypes";
import CharacterTile from "./CharacterTile";

const CharacterTable = ({ currentData }: TableData) => {
    return (
        <div className="data-table-container">
            <table className="data-table">
                <tbody>
                    <tr className="row-header">
                        <th className="col-sel">
                            <input type="checkbox"></input>
                        </th>
                        <th className="col-name">Name</th>
                        <th className="col">Avatar</th>
                        <th className="col">Origin</th>
                        <th className="col">Gender</th>
                        <th className="col">Status</th>
                    </tr>
                    {currentData &&
                        currentData.map((item, index) => (
                            <CharacterTile
                                key={index}
                                checked={false}
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
