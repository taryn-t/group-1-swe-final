"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PaginatedTextbookResponse } from "@/models/Textbook";

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

export function useTextbookSearch() {
  const params = useParams<{ textbooks: string[] }>();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<PaginatedTextbookResponse>();
  const [single, setSingle] = useState<any>();
  const [isSingleView, setIsSingleView] = useState(false);

  const query = searchParams.get("q");
  const dept = searchParams.get("dept");
  const qPage = searchParams.get("page");
  const page = qPage ? parseInt(qPage, 10) : 1;

  useEffect(() => {
    async function fetchData() {
      let url = "";
      let isSingle = false;

      if (params.textbooks?.[0] === "search") {
        if (dept) {
          url = `/api/textbooks/search?department=${dept}&page=${page}`;
        } else if (query) {
          url = `/api/textbooks/search?q=${encodeURIComponent(query)}&page=${page}`;
        } else {
          url = `/api/textbooks?page=${page}`;
        }
      } else if (params.textbooks?.length === 1 && params.textbooks[0].length > 3 && params.textbooks[0] !== "search") {
        url = `/api/textbooks/${params.textbooks[0]}`;
        isSingle = true;
      } else if (params.textbooks?.length >= 1) {
        const [first, second, third] = params.textbooks;
        url = `/api/textbooks/search?department=${first}&page=${page}`;
        if (second) url += `&course=${second}`;
        if (third) url += `&section=${third}`;
      } else {
        url = `/api/textbooks?page=${page}`;
      }

      const data = await fetchJSON(url);

      if (!data.success) return;

      if (isSingle) {
        setSingle(data.textbook);
        setResults(undefined);
        setIsSingleView(true);
      } else {
        setResults(data);
        setSingle(undefined);
        setIsSingleView(false);
      }
    }

    fetchData();
  }, [params, searchParams]);

  function buildHeaderText() {
    if (params.textbooks?.[0] === "search" && query) return `${results?.results.length} found for "${query}"`;
    if (params.textbooks?.[0] === "search" && dept) return `${results?.results.length} found for department "${dept}"`;

    if (params.textbooks?.length === 1 && params.textbooks[0].length === 3) {
      return `All textbooks for department ${params.textbooks[0]}`;
    }
    if (params.textbooks?.length === 2) {
      return `All textbooks for course ${params.textbooks[1]}`;
    }
    if (params.textbooks?.length === 3) {
      return `Textbooks for section ${params.textbooks[2]}`;
    }
    return "All Textbooks";
  }

  return {
    results,
    single,
    isSingleView,
    buildHeaderText,
    page,
  };
}
