import React from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
    <div className={`pt-3`}>
    <button
        className="flex h-14 w-full items-center justify-center rounded-lg bg-primary-6000 text-white bg-header hover:bg-primary-700 focus:outline-none md:h-12 font-semibold"
        onClick={onClick}
    >Bilet Bul</button>
</div>
)
export default SearchButton;
