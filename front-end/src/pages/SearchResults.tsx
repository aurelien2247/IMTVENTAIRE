import { useSearchParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import ArticleCard, {
  ArticleCardSkeleton,
} from "@/components/custom/article/ArticleCard";
import Card from "@/components/custom/Card";
import NotFound from "./common/NotFound";
import Error from "./common/Error";
import { useSearch } from "@/hooks/common/useSearch";
import { searchQueryAtom } from "@/lib/atoms";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const { articles, rooms, isLoading, error } = useSearch();

  // Initialize search query from URL
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam, setSearchQuery]);

  if (isLoading) {
    return (
      <div className="container">
        <HeaderSkeleton />
        <SearchBar />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header title="Résultats de la recherche" />
        <SearchBar />
        <Error />
      </div>
    );
  }

  const hasResults =
    (articles && articles.length > 0) || (rooms && rooms.length > 0);

  if (!hasResults) {
    return (
      <div className="container">
        <Header title="Résultats de la recherche" />
        <SearchBar />
        <NotFound message="Aucun résultat trouvé pour cette recherche" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Résultats de la recherche" />
      <SearchBar />
      <motion.div 
        className="flex flex-col gap-2 mt-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {rooms.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3>Salles</h3>
            <motion.div 
              className="flex flex-col gap-2"
              variants={containerVariants}
            >
              {rooms.map((room) => (
                <motion.div key={room.id} variants={itemVariants}>
                  <Card
                    content={room.nom}
                    link={`/inventaire/${room.etage?.batiment?.id || ""}/${
                      room.etage?.id || ""
                    }/${room.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {articles.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3>Articles</h3>
            <motion.div 
              className="flex flex-col gap-2"
              variants={containerVariants}
            >
              {articles.map((article) => (
                <motion.div key={article.num_inventaire} variants={itemVariants}>
                  <ArticleCard
                    article={article}
                    link={`/inventaire/${
                      article.piece?.etage?.batiment?.id || ""
                    }/${article.piece?.etage?.id || ""}/${
                      article.piece?.id || ""
                    }/${article.num_inventaire}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
