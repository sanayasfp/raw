import {levenshtein} from "../LevenshteinDistance/levenshtein";

type ScoredItem<T> = {
  result: T[];
  score: number;
};

type RankOptions<R = any, T = any> = {
  threshold?: number;
  maxResults?: number;
  ignoreCase?: boolean;
  includeScore?: boolean;
  preprocessFn?: (str: T) => R;
}

function computeStringSimilarity(a: string, b: string) {
  return 1 - (levenshtein(a, b) / Math.max(a.length, b.length));
}

function similarityRankEngine<T = any, R = T>(data: T[] = [], query: string | number, options: RankOptions<R, T> = {}): ScoredItem<R> | ScoredItem<ScoredItem<R>> {
  if (!query || !data.length) return {result: data, score: 0} as unknown as ScoredItem<R>;

  const {
    preprocessFn = (item: T) => item,
    threshold = 0.1,
    maxResults = data.length,
    ignoreCase = false,
    includeScore = false
  } = options;

  const result = data.map((item) => {
    item = preprocessFn(item) as T;

    if (ignoreCase) {
      item = JSON.parse(JSON.stringify(item).toLowerCase());
      query = query.toString().toLowerCase();
    }

    if (!item) return {result: item, score: 0} as ScoredItem<R>;

    if (Array.isArray(item)) {
      const res = similarityRankEngine<R[keyof R]>(item, query);

      return {
        result: Array.from(new Set(res.result.concat(item))),
        score: res.score,
      } as ScoredItem<R>;
    }

    if (typeof item === "object") {
      const objToArr = Object.entries(item);
      const res = similarityRankEngine(objToArr, query);
      // res.result = res.result.filter((entry) => entry.length === 2);

      // const orderedEntries = res.result.map((pair) => {
      //   const isOrdered = objToArr.some(([key, value]) => pair[0] === key && pair[1] === value);
      //
      //   if (isOrdered) return pair;
      //   else return pair.reverse();
      // });

      return {
        result: item, // Object.fromEntries(orderedEntries),
        score: res.score
      } as ScoredItem<R>;
    }

    return {result: item, score: computeStringSimilarity(String(item), String(query))} as ScoredItem<R>;
  });

  const totalScore = result.reduce((accScore, {score}) => accScore + score, 0) / result.length;
  const filteredResult = result.filter(({score}) => score >= threshold);

  filteredResult.sort((a, b) => b.score - a.score);

  if (includeScore) {
    return {
      result: filteredResult.slice(0, maxResults),
      score: totalScore,
    };
  }

  return {
    result: filteredResult.map(({result}) => result).slice(0, maxResults) as any,
    score: totalScore,
  };
}

if (require.main === module) {
  const dataList = [
    "Pomme",
    "Banane",
    123,
    {name: "Orange", price: 1.50},
    ["Poire", "Raisin"],
    {fruit: "Ananas", color: "jaune"},
    "Fraise",
    456,
    [789, 987],
    "Kiwi",
    "Melon",
    {fruit: "Citron", color: "jaune"}
  ];

  const strDataList = dataList.map((item) => JSON.stringify(item));

  const query = "an";

  const result = similarityRankEngine(dataList, query, {includeScore: true});

  console.dir(result, {depth: null});
}
