import { AlertTitle } from "@/components/ui/alert";

import { AnimatePresence } from "motion/react";

import type { Article } from "@/types";

import type { Piece } from "@/types";
import { motion } from "motion/react";
import ArticleItem from "@/components/custom/article/ArticleItem";
import { Alert } from "@/components/ui/alert";
import { Check } from "lucide-react";

interface ScanModeProps {
  piece: Piece;
  articlesScanned: Article[];
}

export default function ScanMode({ piece, articlesScanned }: ScanModeProps) {
  /**
   * On récupère les articles qui n'ont pas été scannés
   * On filtre les articles scannés par rapport aux articles de la pièce
   */
  const articlesToScan =
    piece.articles?.filter((article) => {
      const isNotScanned = !articlesScanned.some(
        (scannedArticle) =>
          scannedArticle.num_inventaire === article.num_inventaire
      );
      return isNotScanned;
    }) ?? [];

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence>
        {articlesScanned.length > 0 && (
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-muted-foreground">Articles scannés</p>
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {articlesScanned.map((article) => (
                  <motion.div
                    key={article.num_inventaire}
                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ArticleItem article={article} isScanned />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {articlesToScan?.length ? (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted-foreground">Articles pas encore scannés</p>
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {articlesToScan.map((article) => (
                <motion.div
                  key={article.num_inventaire}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, x: 100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ArticleItem article={article} isScanned={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Alert variant="success">
            <Check />
            <AlertTitle>Tout est scanné !</AlertTitle>
          </Alert>
        </motion.div>
      )}
    </div>
  );
}
