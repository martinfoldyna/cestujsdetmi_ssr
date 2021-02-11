import Link from "next/link";
import parse from "html-react-parser";

const SmallArticle = ({ article }) => {
  const generateURL = `${
    article.typ_objektu &&
    (article.typ_objektu === "ubytovani"
      ? "/ubytovani"
      : article.typ_objektu === "zabava" || article.typ_objektu === "vylety"
      ? "/vylety"
      : "")
  }/detail/${article.id}`;
  return article ? (
    <Link href={generateURL}>
      <div className="small-article-card">
        <h3>{article.nazev}</h3>
        <p className="text-white">
          {article.zakladni_popis && parse(article.zakladni_popis)}
        </p>
      </div>
    </Link>
  ) : (
    ""
  );
};

export default SmallArticle;
