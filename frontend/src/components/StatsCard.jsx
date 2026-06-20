function StatsCard({ stats }) {

  return (
    <div className="card">

      <h2>System Stats</h2>

      <p>
        Total Queries:
        {" "}
        {stats.totalQueries}
      </p>

      <p>
        Rule Queries:
        {" "}
        {stats.ruleQueries}
      </p>

      <p>
        LLM Queries:
        {" "}
        {stats.llmQueries}
      </p>

      <p>
        Cache Hits:
        {" "}
        {stats.cacheHits}
      </p>

      <p>
        Cache Hit Rate:
        {" "}
        {stats.cacheHitRate}
      </p>

      <p>
        Avg Response Time:
        {" "}
        {stats.averageResponseTime}
      </p>

    </div>
  );
}

export default StatsCard;