import React, { useState, useEffect, useRef } from "react";
import {
    useGetAllCharactersQuery,
    useLazyGetCharactersPageQuery,
} from "./rtk/api";
import { Character, CharactersSet } from "./types/appTypes";
import ReactPaginate from "react-paginate";
import CharacterTable from "./components/CharacterTable";
import { ReactComponent as SearchIcon } from "./assets/search.svg";
import Tooltip from "./components/Tooltip";

function App() {
    const itemsPerPage = 5;
    const legacyItemsPerPage = 20;
    const maxSearchStrLength = 36;
    const species = ["Human", "Alien"];
    const startOffset = useRef(0);
    const endOffset = useRef(0);
    const pageCount = useRef(0);
    const legacyPageNo = useRef(0);
    const currentPageNo = useRef(0);
    const [tooltipVisibility, setTooltipVisibility] = useState<boolean>(false);

    const [searchString, setSearchString] = useState<string>("");
    const nameFilter = useRef<string>("");
    const speciesFilter = useRef<string>("");

    const [data, setData] = useState<CharactersSet | undefined>();
    const [currentData, setCurrentData] = useState<Character[] | undefined>([]);

    const initialData = useGetAllCharactersQuery(undefined);
    const [fetchTrigger, fetchedData] = useLazyGetCharactersPageQuery();

    useEffect(() => {
        if (initialData.isSuccess) {
            pageCount.current =
                Math.ceil(initialData?.data.info.count / itemsPerPage) || 0;
            endOffset.current = startOffset.current + itemsPerPage;
            setCurrentData(
                initialData.data.results.slice(
                    startOffset.current,
                    endOffset.current
                )
            );
            legacyPageNo.current =
                parseInt(initialData.data.info.next?.slice(-1) || "0") - 1;
            setData(initialData.data);
        }
    }, [initialData]);

    useEffect(() => {
        pageCount.current =
            Math.ceil(
                (fetchedData.currentData?.info.count || 0) / itemsPerPage
            ) || 0;
        endOffset.current = startOffset.current + itemsPerPage;
        const legacyPagePos =
            Math.floor(
                (currentPageNo.current * itemsPerPage) / legacyItemsPerPage
            ) + 1;
        startOffset.current =
            (currentPageNo.current * itemsPerPage) % legacyItemsPerPage;
        endOffset.current = startOffset.current + itemsPerPage;
        setCurrentData(
            fetchedData.currentData?.results.slice(
                startOffset.current,
                endOffset.current
            )
        );
        setData(fetchedData.currentData);
        legacyPageNo.current = legacyPagePos;
    }, [fetchedData]);

    const handlePageClick = (selectedItem: { selected: number }) => {
        currentPageNo.current = selectedItem.selected;
        const legacyPagePos =
            Math.floor(
                (selectedItem.selected * itemsPerPage) / legacyItemsPerPage
            ) + 1;

        if (legacyPagePos === legacyPageNo.current) {
            startOffset.current =
                (selectedItem.selected * itemsPerPage) % legacyItemsPerPage;
            endOffset.current = startOffset.current + itemsPerPage;
            setCurrentData(
                data?.results.slice(startOffset.current, endOffset.current)
            );
        } else {
            fetchTrigger({
                currentPage: legacyPagePos,
                nameFilter: nameFilter.current,
                speciesFilter: speciesFilter.current,
            });
        }
    };

    const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
        speciesFilter.current = event.target.value;
    };

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > maxSearchStrLength)
            setTooltipVisibility(true);
        else {
            setTooltipVisibility(false);
            setSearchString(event.target.value);
        }
    };

    useEffect(() => {
        nameFilter.current = searchString;
    }, [searchString]);

    const triggerSearch = () => {
        console.log(nameFilter.current);
        console.log(speciesFilter.current);
        // reset pagination to initial state
        currentPageNo.current = 0;
        startOffset.current = 0;
        legacyPageNo.current = 0;
        fetchTrigger({
            currentPage: 1,
            nameFilter: nameFilter.current,
            speciesFilter: speciesFilter.current,
        });
    };

    return (
        <div className="app">
            <div className="main-container">
                <h1 className="header">Characters</h1>
                <div className="search">
                    <div className="search-chunk">
                        <i onClick={triggerSearch}>
                            <SearchIcon className="search-icon" />
                        </i>
                        {tooltipVisibility && (
                            <Tooltip text="Input is too long!" />
                        )}
                        <input
                            className="search-input"
                            type="text"
                            onChange={handleSearchInput}
                            value={searchString}
                            placeholder="Search"
                        />
                    </div>
                    <select
                        className="select-species"
                        onChange={handleDropdown}
                    >
                        <option value={""}>Any</option>
                        {species.map((element, index) => {
                            return (
                                <option
                                    key={index}
                                    value={element.toLowerCase()}
                                >
                                    {element}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <CharacterTable currentData={currentData} />
                <ReactPaginate
                    containerClassName="pagination-container"
                    pageLinkClassName="paginate-page-link"
                    nextClassName="paginate-page"
                    activeClassName="paginate-page-active"
                    activeLinkClassName="paginate-page-active-link"
                    nextLinkClassName="paginate-page-link"
                    previousClassName="paginate-page"
                    previousLinkClassName="paginate-page-link"
                    pageClassName="paginate-page"
                    breakClassName="paginate-page"
                    breakLinkClassName="paginate-page-link"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount.current}
                    previousLabel="<"
                    renderOnZeroPageCount={() => null}
                />
            </div>
        </div>
    );
}

export default App;
