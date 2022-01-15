import Image from "next/image";
import styles from "../styles/nameSection.module.scss";

interface NameSectionProps {
  logo: string;
  name: string;
  symbol: string;
  rank: number;
  category: string;
  updated: string;
  tags: string[];
}

export const NameSection: React.FC<NameSectionProps> = ({
  logo,
  name,
  symbol,
  rank,
  category,
  updated,
  tags,
}) => {
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10);
  };

  return (
    <div className={styles.nameSection}>
      {/* image and name of the currency */}
      <div className={styles.nameContainer}>
        <Image src={logo} width={30} height={30} />
        <div className={styles.name}>{name}</div>
        <div className={styles.symbol}>{symbol}</div>
        <Image src="/icons/star-empty.svg" alt="" width={15} height={15} />
      </div>
      {/* additional information about the currency */}
      <div className={styles.infoContainer}>
        <div>Rank #{rank}</div>
        <div>{category}</div>
        <div>Updated: {formatDate(updated)}</div>
      </div>
      {/* tags for the currency */}
      <div className={styles.tagsContainer}>
        <div className={styles.tagHeading}>Tags: </div>
        <div className={styles.tags}>
          {tags.slice(0, 3).map((tag) => {
            return (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
