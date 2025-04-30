"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { MerchandiseDocument } from "@/models/Merchandise";

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

export function useMerchandiseSearch() {
  const params = useParams<{ merch: string[] }>();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<MerchandiseDocument[]>([]);
  const [single, setSingle] = useState<MerchandiseDocument | null>(null);
  const [isSingleView, setIsSingleView] = useState(false);

  const query = searchParams.get("q");
  const qPage = searchParams.get("page");
  const page = qPage ? parseInt(qPage, 10) : 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      let url = "";
      let isSingle = false;

      if (query) {
        url = `/api/merchandise/search?q=${encodeURIComponent(query)}&page=${page}`;
      } else if (params.merch?.[0] && !params.merch?.[1]) {
        url = `/api/merchandise?id=${params.merch[0]}`;
        isSingle = true;
      } else {
        url = `/api/merchandise?page=${page}`;
      }

      const data = await fetchJSON(url);

      if (!data.success) return;

      if (isSingle) {
        setSingle(data.merchandise);
        setResults([]);
        setTotalPages(1);
        setIsSingleView(true);
      } else {
        setResults(data.results);
        setTotalPages(data.totalPages || 1);
        setSingle(null);
        setIsSingleView(false);
      }
    }

    fetchData();
  }, [params, searchParams]);

  function buildHeaderText() {
    if (query) return `${results.length} results found for "${query}"`;
    return "All Marshall Merch";
  }

  return {
    results,
    single,
    isSingleView,
    buildHeaderText,
    page,
    totalPages,
  };
}
