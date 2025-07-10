export interface Pokemon {
  name: string;
  id: number;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  abilities: Ability[];
  types: TypeInfo[];
  stats: Stat[];
  moves: Move[];
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface TypeInfo {
  type: {
    name: string;
  };
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Move {
  move: {
    name: string;
  };
}

export interface PokemonCardProps {
  name: string;
  index: number;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}