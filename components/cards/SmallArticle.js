import Link from "next/link";
import parse from "html-react-parser";

const SmallArticle = ({ article }) => {
  const generateURL = `${
    article.typ_objektu &&
    (article.typ_objektu === "ubytovani"
      ? "/tipy-na-ubytovani"
      : article.typ_objektu === "zabava" || article.typ_objektu === "vylety"
      ? "/tipy-na-vylety"
      : "")
  }/detail/${article.id}`;
  return article ? (
    <Link href={generateURL}>
      <div className="small-article-card">
        <h3>{article.nazev}</h3>
        {parse(article.zakladni_popis)}
      </div>
    </Link>
  ) : (
    ""
  );
};

export default SmallArticle;
