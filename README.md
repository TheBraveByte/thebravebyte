 💻 

## Software Engineer & BackEnd Developer

> Building reliable and efficient server-side applications

## 🚀 About Me

I create fast, dependable APIs and design data solutions. My technical toolkit includes streamlining deployment processes and creating containerized applications that work consistently across development stages.

- 🔭 Currently working on backend systems and API development
- 🌱 Learning JavaScript/TypeScript for frontend development
- ⚡ Built LLM vectorization pipelines
- 📫 Contact: [ayaaakinleye@gmail.com](mailto:ayaaakinleye@gmail.com)

## 💻 Tech Stack

```go
func GetTechStack() map[string][]string {
    return map[string][]string{
        "Languages":     {"Go", "Python", "JavaScript", "TypeScript"},
        "Frameworks":    {"Fiber", "Gin", "FastAPI", "gRPC"},
        "Databases":     {"MongoDB", "PostgreSQL"},
        "DevOps":        {"Docker", "AWS", "Nginx", "Travis CI"},
        "Tools":         {"Git", "GitHub", "Postman"},
        "Architecture":  {"DDD", "Package-Oriented Design", "RESTful APIs"},
        "ML":           {"PyTorch", "TensorFlow"},
    }
}
```

## 📊 GitHub Stats

[![GitHub Streak](https://streak-stats.demolab.com?user=TheBraveByte&theme=dark)](https://git.io/streak-stats)
[![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=TheBraveByte&layout=donut-vertical&theme=vision-friendly-dark)](https://github.com/anuraghazra/github-readme-stats)

## Coding Stats

![Yusuf's WakaTime Stats](https://github-readme-stats.vercel.app/api/wakatime?username=bravebyte_&theme=radical)

[![Total time coded since Nov 21 2023](https://wakatime.com/badge/user/018bf172-272c-4d25-9859-84617c8d2e14.svg)](https://wakatime.com/@018bf172-272c-4d25-9859-84617c8d2e14)

## 🤝 Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yusuf-akinleye-bb35981b4)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/TheBraveByte)
[![Blog](https://img.shields.io/badge/Blog-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://ayaacodes.hashnode.dev/)

// table.sql

CREATE TABLE IF NOT EXISTS content_views
(
    event_id           UUID,
    resource_type      LowCardinality(String),
    resource_id        String,
    content_id         String,
    content_type       LowCardinality(String),
    user_id            String,
    feed_id            Nullable(String),
    post_id            Nullable(String),
    post_type          Nullable(String),
    video_id           Nullable(String),
    view_type          LowCardinality(String),
    watch_duration_ms  UInt64,
    page               LowCardinality(String),
    country            LowCardinality(String),
    video_position_ms       Nullable(UInt64),
    video_total_duration_ms UInt64 DEFAULT 0,
    watched_segments        Array(Tuple(UInt64, UInt64, Float64)) DEFAULT [], -- StartMs, EndMs, Speed
    device_id               String,
    timestamp               DateTime
)
ENGINE = ReplacingMergeTree(timestamp)
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, content_id, event_id)
TTL timestamp + INTERVAL 365 DAY; // TODO: Need maksim to confirm how long

CREATE TABLE IF NOT EXISTS session_starts
(
    session_id        UUID,
    user_id           String,
    utm_source        String,
    utm_campaign      String,
    browser           LowCardinality(String),
    language          LowCardinality(String),
    screen_resolution String,
    platform          LowCardinality(String),
    tg_platform       String,
    tg_version        String,
    timezone_offset   Int32,
    timezone          String,
    country           LowCardinality(String),
    color_depth       Int32,
    touch_support     Bool,
    timestamp         DateTime
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, user_id)
TTL timestamp + INTERVAL 365 DAY;

CREATE TABLE IF NOT EXISTS engagement_events
(
    event_id         UUID,
    engagement_type  LowCardinality(String),
    resource_type    LowCardinality(String),
    resource_id      String,
    user_id          String,
    page_type        LowCardinality(String),
    comment_text     Nullable(String),
    share_platform   Nullable(String),
    country          LowCardinality(String),
    device_type      LowCardinality(String),
    timestamp        DateTime
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, resource_id, user_id)
TTL timestamp + INTERVAL 365 DAY;

CREATE TABLE IF NOT EXISTS interaction_events
(
    event_id          UUID,
    interaction_type  LowCardinality(String),
    element_type      LowCardinality(String),
    element_id        String,
    user_id           String,
    session_id        UUID,
    page_type         LowCardinality(String),
    page_url          String,
    scroll_depth      Nullable(Float32),
    search_query      Nullable(String),
    click_position_x  Nullable(Int32),
    click_position_y  Nullable(Int32),
    device_type       LowCardinality(String),
    browser           LowCardinality(String),
    timestamp         DateTime
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, user_id, session_id)
TTL timestamp + INTERVAL 365 DAY;

CREATE TABLE IF NOT EXISTS error_events
(
    event_id       UUID,
    error_type     LowCardinality(String),
    error_code     Nullable(String),
    error_message  String,
    stack_trace    Nullable(String),
    resource_type  Nullable(String),
    resource_id    Nullable(String),
    endpoint       Nullable(String),
    user_id        String,
    session_id     UUID,
    device_type    LowCardinality(String),
    browser        LowCardinality(String),
    os             LowCardinality(String),
    timestamp      DateTime
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, error_type)
TTL timestamp + INTERVAL 365 DAY;


CREATE TABLE IF NOT EXISTS user_properties
(
    user_id           String,
    property_name     LowCardinality(String),
    property_value    String,
    property_type     LowCardinality(String) DEFAULT 'string',
    timestamp         DateTime
)
ENGINE = ReplacingMergeTree(timestamp)
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, property_name)
TTL timestamp + INTERVAL 730 DAY;

CREATE TABLE IF NOT EXISTS video_heatmap_stats
(
    video_id              String,
    bucket_index          UInt8,
    total_seconds_watched Float64,
    unique_views          AggregateFunction(uniq, String)
)
ENGINE = SummingMergeTree()
ORDER BY (video_id, bucket_index);

CREATE MATERIALIZED VIEW IF NOT EXISTS video_heatmap_mv TO video_heatmap_stats AS
SELECT
    content_id as video_id,
    floor(arrayJoin(range(
        toUInt64(floor(tupleElement(segment, 1) / (video_total_duration_ms / 100))), 
        toUInt64(floor(tupleElement(segment, 2) / (video_total_duration_ms / 100))) + 1
    ))) as bucket_index,
    count() as total_seconds_watched,
    uniqState(user_id) as unique_views
FROM content_views
ARRAY JOIN watched_segments AS segment
WHERE content_type = 'video'
  AND view_type = 'watch'
  AND video_total_duration_ms > 0
GROUP BY video_id, bucket_index;

CREATE TABLE IF NOT EXISTS video_segment_events
(
    event_id         UUID,
    video_id         String,
    user_id          String,
    segment_start_ms UInt64,
    segment_end_ms   UInt64,
    speed            Float64,
    timestamp        DateTime
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, video_id, user_id)
TTL timestamp + INTERVAL 365 DAY;

CREATE TABLE IF NOT EXISTS video_heatmap_per_second
(
    video_id     String,
    second       UInt32,
    hits         UInt64,
    unique_views AggregateFunction(uniq, String)
)
ENGINE = SummingMergeTree()
ORDER BY (video_id, second);

CREATE MATERIALIZED VIEW IF NOT EXISTS video_heatmap_per_second_mv TO video_heatmap_per_second AS
SELECT
    content_id as video_id,
    arrayJoin(range(
        toUInt64(floor(tupleElement(segment, 1) / 1000)), 
        toUInt64(floor(tupleElement(segment, 2) / 1000)) + 1
    )) as second,
    count() as hits,
    uniqState(user_id) as unique_views
FROM content_views
ARRAY JOIN watched_segments AS segment
WHERE content_type = 'video'
  AND view_type = 'watch'
GROUP BY video_id, second;

CREATE TABLE IF NOT EXISTS video_heatmap_processed
(
    video_id              String,
    total_duration_ms     UInt64,
    points                Array(Float64),
    updated_at            DateTime
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY video_id;


// queries.go
package analytics

import (
	"context"
	"fmt"
	"time"

	"github.com/ClickHouse/clickhouse-go/v2"
)

func QueryVideoStats(videoID string, startDate, endDate time.Time) (*VideoStats, error) {

	query := `
		SELECT 
			content_id as video_id,
			count() as total_views,
			uniq(user_id) as unique_viewers,
			avg(watch_duration_ms) as avg_watch_time,
			sum(watch_duration_ms) as total_watch_time,
			countIf(view_type = 'start') as starts,
			countIf(view_type = 'watch') as watches,
			countIf(view_type = 'end') as completions
		FROM content_views
		WHERE content_id = ?
		  AND content_type = 'video'
		  AND timestamp BETWEEN ? AND ?
		GROUP BY content_id
	`

	var stats VideoStats
	var err error
	row := Client.QueryRow(context.Background(), query, videoID, startDate, endDate)
	err = row.Scan(
		&stats.VideoID,
		&stats.TotalViews,
		&stats.UniqueViewers,
		&stats.AvgWatchTimeMs,
		&stats.TotalWatchTimeMs,
		&stats.Starts,
		&stats.Watches,
		&stats.Completions,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to query video stats: %w", err)
	}

	if stats.Starts > 0 {
		stats.CompletionRate = float64(stats.Completions) / float64(stats.Starts)
	}

	stats.ViewsByPage, _ = getViewsByPage(Client, "content_id", videoID, startDate, endDate)

	return &stats, nil
}

func QueryPostStats(postID string, startDate, endDate time.Time) (*PostStats, error) {

	query := `
		SELECT 
			post_id,
			any(feed_id) as feed_id,
			any(content_type) as content_type,
			count() as total_views,
			uniq(user_id) as unique_viewers,
			avg(watch_duration_ms) as avg_watch_time,
			sum(watch_duration_ms) as total_watch_time,
			countIf(view_type = 'start') as starts,
			countIf(view_type = 'end') as completions
		FROM content_views
		WHERE post_id = ?
		  AND timestamp BETWEEN ? AND ?
		GROUP BY post_id
	`

	var stats PostStats
	var feedID *string
	var contentType string
	var err error
	row := Client.QueryRow(context.Background(), query, postID, startDate, endDate)
	err = row.Scan(
		&stats.PostID,
		&feedID,
		&contentType,
		&stats.TotalViews,
		&stats.UniqueViewers,
		&stats.AvgWatchTimeMs,
		&stats.TotalWatchTimeMs,
		&stats.Starts,
		&stats.Completions,
	)

	stats.ContentType = ContentType(contentType)

	if err != nil {
		return nil, fmt.Errorf("failed to query post stats: %w", err)
	}

	if feedID != nil {
		stats.FeedID = *feedID
	}

	if stats.Starts > 0 {
		stats.CompletionRate = float64(stats.Completions) / float64(stats.Starts)
	}

	stats.ViewsByPage, _ = getViewsByPage(Client, "post_id", postID, startDate, endDate)

	return &stats, nil
}

func QueryFeedStats(feedID string, startDate, endDate time.Time) (*FeedStats, error) {

	query := `
		SELECT 
			feed_id,
			count() as total_views,
			uniq(user_id) as unique_viewers,
			uniq(post_id) as total_posts,
			avg(watch_duration_ms) as avg_time_per_visit,
			sum(watch_duration_ms) as total_watch_time
		FROM content_views
		WHERE feed_id = ?
		  AND timestamp BETWEEN ? AND ?
		GROUP BY feed_id
	`

	var stats FeedStats
	var err error
	row := Client.QueryRow(context.Background(), query, feedID, startDate, endDate)
	err = row.Scan(
		&stats.FeedID,
		&stats.TotalViews,
		&stats.UniqueViewers,
		&stats.TotalPosts,
		&stats.AvgTimePerVisit,
		&stats.TotalWatchTimeMs,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to query feed stats: %w", err)
	}

	return &stats, nil
}

func QueryTopFeeds(limit int, startDate, endDate time.Time) ([]FeedStats, error) {

	query := `
        SELECT 
            feed_id,
            count() as total_views,
            uniq(user_id) as unique_viewers,
            uniq(post_id) as total_posts,
            avg(watch_duration_ms) as avg_time_per_visit,
            sum(watch_duration_ms) as total_watch_time
        FROM content_views
        WHERE feed_id IS NOT NULL
          AND timestamp BETWEEN ? AND ?
        GROUP BY feed_id
        ORDER BY total_views DESC
        LIMIT ?
    `

	rows, err := Client.Query(context.Background(), query, startDate, endDate, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to query top feeds: %w", err)
	}
	defer rows.Close()

	results := []FeedStats{}
	for rows.Next() {
		var s FeedStats
		if err := rows.Scan(&s.FeedID, &s.TotalViews, &s.UniqueViewers, &s.TotalPosts, &s.AvgTimePerVisit, &s.TotalWatchTimeMs); err != nil {
			continue
		}
		results = append(results, s)
	}

	return results, nil
}

func QueryTopVideos(limit int, startDate, endDate time.Time) ([]VideoStats, error) {

	query := `
		SELECT 
			content_id as video_id,
			count() as total_views,
			uniq(user_id) as unique_viewers,
			avg(watch_duration_ms) as avg_watch_time,
			sum(watch_duration_ms) as total_watch_time,
			countIf(view_type = 'start') as starts,
			countIf(view_type = 'watch') as watches,
			countIf(view_type = 'end') as completions
		FROM content_views
		WHERE content_type = 'video'
		  AND timestamp BETWEEN ? AND ?
		GROUP BY content_id
		ORDER BY total_views DESC
		LIMIT ?
	`

	rows, err := Client.Query(context.Background(), query, startDate, endDate, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to query top videos: %w", err)
	}
	defer rows.Close()

	results := []VideoStats{}
	for rows.Next() {
		var stats VideoStats
		err := rows.Scan(
			&stats.VideoID,
			&stats.TotalViews,
			&stats.UniqueViewers,
			&stats.AvgWatchTimeMs,
			&stats.TotalWatchTimeMs,
			&stats.Starts,
			&stats.Watches,
			&stats.Completions,
		)
		if err != nil {
			continue
		}

		if stats.Starts > 0 {
			stats.CompletionRate = float64(stats.Completions) / float64(stats.Starts)
		}

		results = append(results, stats)
	}

	return results, nil
}

func QueryTopPosts(limit int, startDate, endDate time.Time, feedID string) ([]PostStats, error) {

	query := `
		SELECT 
			post_id,
			any(feed_id) as feed_id,
			any(content_type) as content_type,
			count() as total_views,
			uniq(user_id) as unique_viewers,
			avg(watch_duration_ms) as avg_watch_time,
			sum(watch_duration_ms) as total_watch_time,
			countIf(view_type = 'start') as starts,
			countIf(view_type = 'end') as completions
		FROM content_views
		WHERE post_id IS NOT NULL
		  AND timestamp BETWEEN ? AND ?
	`

	args := []interface{}{startDate, endDate}

	if feedID != "" {
		query += " AND feed_id = ?"
		args = append(args, feedID)
	}

	query += `
		GROUP BY post_id
		ORDER BY total_views DESC
		LIMIT ?
	`
	args = append(args, limit)

	rows, err := Client.Query(context.Background(), query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query top posts: %w", err)
	}
	defer rows.Close()

	results := []PostStats{}
	for rows.Next() {
		var stats PostStats
		var fid *string
		err := rows.Scan(
			&stats.PostID,
			&fid,
			&stats.ContentType,
			&stats.TotalViews,
			&stats.UniqueViewers,
			&stats.AvgWatchTimeMs,
			&stats.TotalWatchTimeMs,
			&stats.Starts,
			&stats.Completions,
		)
		if err != nil {
			continue
		}

		if fid != nil {
			stats.FeedID = *fid
		}

		if stats.Starts > 0 {
			stats.CompletionRate = float64(stats.Completions) / float64(stats.Starts)
		}

		results = append(results, stats)
	}

	return results, nil
}

func getViewsByPage(conn clickhouse.Conn, filterField, filterValue string, startDate, endDate time.Time) (map[string]uint64, error) {
	query := fmt.Sprintf(`
		SELECT page, count() as views
		FROM content_views
		WHERE %s = ?
		  AND timestamp BETWEEN ? AND ?
		GROUP BY page
	`, filterField)

	rows, err := conn.Query(context.Background(), query, filterValue, startDate, endDate)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	viewsByPage := make(map[string]uint64)
	for rows.Next() {
		var page string
		var views uint64
		if err := rows.Scan(&page, &views); err == nil {
			viewsByPage[page] = views
		}
	}

	return viewsByPage, nil
}

func SetUserProperties(userID string, properties map[string]string) error {

	batch, err := Client.PrepareBatch(context.Background(), "INSERT INTO user_properties")
	if err != nil {
		return fmt.Errorf("failed to prepare batch: %w", err)
	}

	timestamp := time.Now()
	for key, value := range properties {
		err = batch.Append(userID, key, value, "string", timestamp)
		if err != nil {
			return fmt.Errorf("failed to append property: %w", err)
		}
	}

	return batch.Send()
}

func GetUserProperties(userID string) (*UserProfile, error) {

	query := `
		SELECT 
			property_name,
			property_value,
			min(timestamp) as first_seen,
			max(timestamp) as last_seen
		FROM user_properties
		WHERE user_id = ?
		GROUP BY property_name, property_value
	`

	rows, err := Client.Query(context.Background(), query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to query user properties: %w", err)
	}
	defer rows.Close()

	profile := &UserProfile{
		UserID:     userID,
		Properties: make(map[string]string),
	}

	for rows.Next() {
		var propName, propValue string
		var firstSeen, lastSeen time.Time
		if err := rows.Scan(&propName, &propValue, &firstSeen, &lastSeen); err != nil {
			continue
		}
		profile.Properties[propName] = propValue
		if profile.FirstSeen.IsZero() || firstSeen.Before(profile.FirstSeen) {
			profile.FirstSeen = firstSeen
		}
		if lastSeen.After(profile.LastSeen) {
			profile.LastSeen = lastSeen
		}
	}

	return profile, nil
}

func CalculateFunnel(req FunnelRequest, startDate, endDate time.Time) (*FunnelAnalytics, error) {

	if len(req.Steps) == 0 {
		return nil, fmt.Errorf("no steps provided")
	}

	firstStep := req.Steps[0]
	firstStepQuery := `
		SELECT DISTINCT user_id, timestamp
		FROM interaction_events
		WHERE timestamp >= ? AND timestamp <= ?
		AND page_type = ?
		AND interaction_type = ?
		ORDER BY user_id, timestamp
	`

	rows, err := Client.Query(context.Background(), firstStepQuery, startDate, endDate, string(firstStep.PageType), firstStep.EventType)
	if err != nil {
		return nil, fmt.Errorf("failed to query first step: %w", err)
	}
	defer rows.Close()

	prevUsers := make(map[string]time.Time)
	for rows.Next() {
		var userID string
		var timestamp time.Time
		if err := rows.Scan(&userID, &timestamp); err != nil {
			continue
		}
		if _, exists := prevUsers[userID]; !exists {
			prevUsers[userID] = timestamp
		}
	}
	rows.Close()

	totalUsers := len(prevUsers)
	analytics := &FunnelAnalytics{
		TotalUsers: totalUsers,
		Steps:      make([]FunnelStepResult, len(req.Steps)),
	}

	analytics.Steps[0] = FunnelStepResult{
		StepName:       firstStep.Name,
		UserCount:      totalUsers,
		ConversionRate: 1.0,
		DropoffRate:    0.0,
	}

	timeWindow := time.Duration(req.TimeWindow) * time.Hour

	for i := 1; i < len(req.Steps); i++ {
		step := req.Steps[i]
		stepQuery := `
			SELECT DISTINCT user_id, timestamp
			FROM interaction_events
			WHERE timestamp >= ? AND timestamp <= ?
			AND page_type = ?
			AND interaction_type = ?
			ORDER BY user_id, timestamp
		`

		stepRows, err := Client.Query(context.Background(), stepQuery, startDate, endDate, string(step.PageType), step.EventType)
		if err != nil {
			return nil, fmt.Errorf("failed to query step %d: %w", i, err)
		}

		completedUsers := make(map[string]time.Time)
		for stepRows.Next() {
			var userID string
			var timestamp time.Time
			if err := stepRows.Scan(&userID, &timestamp); err != nil {
				stepRows.Close()
				return nil, err
			}

			if prevTimestamp, exists := prevUsers[userID]; exists {
				if timestamp.After(prevTimestamp) && timestamp.Sub(prevTimestamp) <= timeWindow {
					completedUsers[userID] = timestamp
				}
			}
		}
		stepRows.Close()

		stepUserCount := len(completedUsers)
		conversionRate := 0.0
		if len(prevUsers) > 0 {
			conversionRate = float64(stepUserCount) / float64(len(prevUsers))
		}

		analytics.Steps[i] = FunnelStepResult{
			StepName:       step.Name,
			UserCount:      stepUserCount,
			ConversionRate: conversionRate,
			DropoffRate:    1.0 - conversionRate,
		}

		prevUsers = completedUsers
	}

	analytics.CompletedUsers = len(prevUsers)
	if totalUsers > 0 {
		analytics.CompletionRate = float64(analytics.CompletedUsers) / float64(totalUsers)
	}

	return analytics, nil
}

func CalculateRetention(period RetentionPeriod, startDate, endDate time.Time) (*RetentionAnalytics, error) {

	var periodUnit string
	switch period {
	case RetentionPeriodDay:
		periodUnit = "Day"
	case RetentionPeriodWeek:
		periodUnit = "Week"
	case RetentionPeriodMonth:
		periodUnit = "Month"
	default:
		periodUnit = "Week"
	}

	query := fmt.Sprintf(`
		WITH user_first_seen AS (
			SELECT 
				user_id,
				toStartOf%s(MIN(timestamp)) as cohort_date
			FROM session_starts
			WHERE timestamp >= ? AND timestamp <= ?
			GROUP BY user_id
		),
		user_activity AS (
			SELECT 
				user_id,
				toStartOf%s(timestamp) as activity_date
			FROM session_starts
			WHERE timestamp >= ? AND timestamp <= ?
			GROUP BY user_id, activity_date
		)
		SELECT 
			cohort_date,
			COUNT(DISTINCT ufs.user_id) as cohort_size,
			dateDiff('%s', cohort_date, activity_date) as period_number,
			COUNT(DISTINCT ua.user_id) as active_users
		FROM user_first_seen ufs
		LEFT JOIN user_activity ua ON ufs.user_id = ua.user_id
		GROUP BY cohort_date, period_number
		ORDER BY cohort_date, period_number
	`, periodUnit, periodUnit, string(period))

	rows, err := Client.Query(context.Background(), query, startDate, endDate, startDate, endDate)
	if err != nil {
		return nil, fmt.Errorf("failed to query retention: %w", err)
	}
	defer rows.Close()

	cohortMap := make(map[string]*RetentionCohort)

	for rows.Next() {
		var cohortDate time.Time
		var cohortSize, periodNumber, activeUsers int
		if err := rows.Scan(&cohortDate, &cohortSize, &periodNumber, &activeUsers); err != nil {
			continue
		}

		cohortKey := cohortDate.Format("2006-01-02")
		cohort, exists := cohortMap[cohortKey]
		if !exists {
			cohort = &RetentionCohort{
				CohortDate:    cohortKey,
				CohortSize:    cohortSize,
				RetentionData: make([]float64, 0),
			}
			cohortMap[cohortKey] = cohort
		}

		retentionRate := 0.0
		if cohortSize > 0 {
			retentionRate = float64(activeUsers) / float64(cohortSize) * 100
		}

		for len(cohort.RetentionData) <= periodNumber {
			cohort.RetentionData = append(cohort.RetentionData, 0.0)
		}
		cohort.RetentionData[periodNumber] = retentionRate
	}

	analytics := &RetentionAnalytics{
		Period:  period,
		Cohorts: []RetentionCohort{},
	}

	for _, cohort := range cohortMap {
		analytics.Cohorts = append(analytics.Cohorts, *cohort)
	}

	return analytics, nil
}

func GetRealtimeStats() (*RealtimeStats, error) {

	fiveMinAgo := time.Now().Add(-5 * time.Minute)
	stats := &RealtimeStats{
		Timestamp: time.Now(),
	}

	activeUsersQuery := `
		SELECT uniq(user_id) as active_users
		FROM content_views
		WHERE timestamp >= ?
	`
	if err := Client.QueryRow(context.Background(), activeUsersQuery, fiveMinAgo).Scan(&stats.ActiveUsers); err != nil {
		stats.ActiveUsers = 0
	}

	eventsQuery := `
		SELECT count() / 5 as events_per_minute
		FROM content_views
		WHERE timestamp >= ?
	`
	if err := Client.QueryRow(context.Background(), eventsQuery, fiveMinAgo).Scan(&stats.EventsPerMinute); err != nil {
		stats.EventsPerMinute = 0
	}

	topEventsQuery := `
		SELECT view_type, count() as count
		FROM content_views
		WHERE timestamp >= ?
		GROUP BY view_type
		ORDER BY count DESC
		LIMIT 5
	`
	topEventsRows, err := Client.Query(context.Background(), topEventsQuery, fiveMinAgo)
	if err == nil {
		defer topEventsRows.Close()
		stats.TopEvents = []EventCount{}
		for topEventsRows.Next() {
			var eventType string
			var count uint64
			if err := topEventsRows.Scan(&eventType, &count); err == nil {
				stats.TopEvents = append(stats.TopEvents, EventCount{EventType: ViewType(eventType), Count: count})
			}
		}
	}

	topCountriesQuery := `
		SELECT country, count() as count
		FROM content_views
		WHERE timestamp >= ?
		GROUP BY country
		ORDER BY count DESC
		LIMIT 5
	`
	topCountriesRows, err := Client.Query(context.Background(), topCountriesQuery, fiveMinAgo)
	if err == nil {
		defer topCountriesRows.Close()
		stats.TopCountries = []CountryCount{}
		for topCountriesRows.Next() {
			var country string
			var count uint64
			if err := topCountriesRows.Scan(&country, &count); err == nil {
				stats.TopCountries = append(stats.TopCountries, CountryCount{Country: country, Count: count})
			}
		}
	}

	recentEventsQuery := `
		SELECT view_type, user_id, content_id, timestamp
		FROM content_views
		WHERE timestamp >= ?
		ORDER BY timestamp DESC
		LIMIT 10
	`
	recentEventsRows, err := Client.Query(context.Background(), recentEventsQuery, fiveMinAgo)
	if err == nil {
		defer recentEventsRows.Close()
		stats.RecentEvents = []RecentEvent{}
		for recentEventsRows.Next() {
			var eventType, userID, contentID string
			var timestamp time.Time
			if err := recentEventsRows.Scan(&eventType, &userID, &contentID, &timestamp); err == nil {
				stats.RecentEvents = append(stats.RecentEvents, RecentEvent{
					EventType: ViewType(eventType),
					UserID:    userID,
					ContentID: contentID,
					Timestamp: timestamp,
				})
			}
		}
	}

	return stats, nil
}

func QueryVideoHeatmap(videoID string, buckets int, startDate, endDate time.Time) (*VideoHeatmap, error) {

	var totalDurationMs uint64
	durationQuery := `
		SELECT max(video_total_duration_ms)
		FROM content_views
		WHERE content_id = ?
		  AND content_type = 'video'
		  AND timestamp BETWEEN ? AND ?
	`
	if err := Client.QueryRow(context.Background(), durationQuery, videoID, startDate, endDate).Scan(&totalDurationMs); err != nil {
		return &VideoHeatmap{VideoID: videoID, Data: []float64{}}, nil
	}

	if totalDurationMs == 0 {
		return &VideoHeatmap{VideoID: videoID, Data: []float64{}}, nil
	}

	heatmapQuery := `
		SELECT
			bucket_index as bucket,
			sum(total_seconds_watched) as views
		FROM video_heatmap_stats
		WHERE video_id = ?
		GROUP BY bucket
		ORDER BY bucket
	`

	if buckets <= 0 {
		buckets = 100
	}

	rows, err := Client.Query(context.Background(), heatmapQuery, videoID)
	if err != nil {
		return nil, fmt.Errorf("failed to query heatmap: %w", err)
	}
	defer rows.Close()

	heatmapData := make([]float64, 101)

	for rows.Next() {
		var bucket int
		var views float64
		if err := rows.Scan(&bucket, &views); err != nil {
			continue
		}
		if bucket >= 0 && bucket <= 100 {
			heatmapData[bucket] = views
		}
	}

	return &VideoHeatmap{
		VideoID:         videoID,
		TotalDurationMs: totalDurationMs,
		Data:            heatmapData,
	}, nil
}

func QueryVideoHeatmapPerSecond(videoID string, startDate, endDate time.Time) (*VideoHeatmap, error) {

	var totalDurationMs uint64
	durationQuery := `
		SELECT max(video_total_duration_ms)
		FROM content_views
		WHERE content_id = ?
		  AND content_type = 'video'
		  AND timestamp BETWEEN ? AND ?
	`
	if err := Client.QueryRow(context.Background(), durationQuery, videoID, startDate, endDate).Scan(&totalDurationMs); err != nil {
		return &VideoHeatmap{VideoID: videoID, Data: []float64{}}, nil
	}

	if totalDurationMs == 0 {
		return &VideoHeatmap{VideoID: videoID, Data: []float64{}}, nil
	}

	// index = second, value = hit
	totalSeconds := int(totalDurationMs / 1000)
	heatmapData := make([]float64, totalSeconds+1)

	query := `
		SELECT
			second,
			sum(hits) as views
		FROM video_heatmap_per_second
		WHERE video_id = ?
		GROUP BY second
		ORDER BY second
	`

	rows, err := Client.Query(context.Background(), query, videoID)
	if err != nil {
		return nil, fmt.Errorf("failed to query per-second heatmap: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var second int
		var views float64
		if err := rows.Scan(&second, &views); err != nil {
			continue
		}
		if second >= 0 && second <= totalSeconds {
			heatmapData[second] = views
		}
	}

	return &VideoHeatmap{
		VideoID:         videoID,
		TotalDurationMs: totalDurationMs,
		Data:            heatmapData,
	}, nil
}

func QueryHotSegments(videoID string, startDate, endDate time.Time) ([]HotSegment, error) {
	// 1. Get per-second heatmap
	heatmap, err := QueryVideoHeatmapPerSecond(videoID, startDate, endDate)
	if err != nil {
		return nil, err
	}

	if len(heatmap.Data) == 0 {
		return []HotSegment{}, nil
	}

	// 2. Calculate average
	var totalViews float64
	var count int
	for _, v := range heatmap.Data {
		totalViews += v
		if v > 0 {
			count++
		}
	}

	if count == 0 {
		return []HotSegment{}, nil
	}

	average := totalViews / float64(count)
	threshold := average * 1.5

	// 3. Find contiguous segments > threshold
	segments := []HotSegment{}
	var currentStart *int

	for i, views := range heatmap.Data {
		if views >= threshold {
			if currentStart == nil {
				start := i
				currentStart = &start
			}
		} else {
			if currentStart != nil {
				multiplier := calculateSegmentMultiplier(heatmap.Data, *currentStart, i-1, average)
				segments = append(segments, HotSegment{
					StartSecond: *currentStart,
					EndSecond:   i - 1,
					Multiplier:  multiplier,
				})
				currentStart = nil
			}
		}
	}

	if currentStart != nil {
		end := len(heatmap.Data) - 1
		multiplier := calculateSegmentMultiplier(heatmap.Data, *currentStart, end, average)
		segments = append(segments, HotSegment{
			StartSecond: *currentStart,
			EndSecond:   end,
			Multiplier:  multiplier,
		})
	}

	return segments, nil
}

func calculateSegmentMultiplier(data []float64, start, end int, average float64) float64 {
	var sum float64
	count := 0
	for i := start; i <= end; i++ {
		sum += data[i]
		count++
	}
	if count == 0 || average == 0 {
		return 0
	}
	segmentAvg := sum / float64(count)
	return segmentAvg / average
}

func QueryHeatmapProcessed(videoID string) (*HeatmapProcessed, error) {
	query := `
		SELECT
			video_id,
			total_duration_ms,
			points,
			updated_at
		FROM video_heatmap_processed
		WHERE video_id = ?
	`
	var h HeatmapProcessed
	err := Client.QueryRow(context.Background(), query, videoID).Scan(
		&h.VideoID,
		&h.TotalDurationMs,
		&h.Points,
		&h.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &h, nil
}

func SaveHeatmapProcessed(ctx context.Context, videoID string, totalDurationMs uint64, points []float64) error {
	query := `
		INSERT INTO video_heatmap_processed (video_id, total_duration_ms, points, updated_at)
		VALUES (?, ?, ?, ?)
	`
	return Client.Exec(ctx, query, videoID, totalDurationMs, points, time.Now())
}

func GetActiveVideos(ctx context.Context, duration time.Duration, minViewers int) ([]string, error) {
	query := `
		SELECT content_id
		FROM content_views
		WHERE content_type = 'video'
		GROUP BY content_id
		HAVING uniq(user_id) >= ? AND max(timestamp) >= ?
	`
	rows, err := Client.Query(ctx, query, minViewers, time.Now().Add(-duration))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	videoIDs := []string{}
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err == nil {
			videoIDs = append(videoIDs, id)
		}
	}
	return videoIDs, nil
}

func QueryDashboardStats(req DashboardStatsRequest) (*DashboardStatsResponse, error) {
	var intervalSeconds int
	switch req.Interval {
	case Interval1m:
		intervalSeconds = 60
	case Interval1h:
		intervalSeconds = 3600
	case Interval1d:
		intervalSeconds = 86400
	default:
		intervalSeconds = 3600
	}

	query := fmt.Sprintf(`
		SELECT
			toStartOfInterval(timestamp, INTERVAL %d SECOND) as time_bucket,
			count() as views,
			uniq(user_id) as unique_users
		FROM content_views
		WHERE timestamp BETWEEN ? AND ?
		GROUP BY time_bucket
		ORDER BY time_bucket
	`, intervalSeconds)

	rows, err := Client.Query(context.Background(), query, req.TimeStart, req.TimeEnd)
	if err != nil {
		return nil, fmt.Errorf("failed to query dashboard stats: %w", err)
	}
	defer rows.Close()

	points := []DashboardPoint{}
	for rows.Next() {
		var bucket time.Time
		var views, uniqueUsers uint64
		if err := rows.Scan(&bucket, &views, &uniqueUsers); err == nil {
			points = append(points, DashboardPoint{
				Timestamp:   bucket,
				Views:       views,
				UniqueUsers: uniqueUsers,
			})
		}
	}

	return &DashboardStatsResponse{
		Points: points,
	}, nil
}

//type.go
package analytics

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"
)

type ResourceType string

const (
	ResourceTypeStandaloneVideo ResourceType = "standalone_video"
	ResourceTypePost            ResourceType = "post"
	ResourceTypeFeed            ResourceType = "feed"
)

type ContentType string
type ViewType string
type Page string
type MetricType string

type DeviceType string

const (
	ContentTypeVideo ContentType = "video"
	ContentTypeImage ContentType = "image"
)

const (
	DeviceTypeMobile  DeviceType = "mobile"
	DeviceTypeDesktop DeviceType = "desktop"
	DeviceTypeTablet  DeviceType = "tablet"
	DeviceTypeTV      DeviceType = "tv"
	DeviceTypeBot     DeviceType = "bot"
)

const (
	ViewTypeStart ViewType = "start"
	ViewTypeWatch ViewType = "watch"
	ViewTypeEnd   ViewType = "end"
)

const (
	PageFeed       Page = "feed"
	PageStandalone Page = "standalone"
	PageProfile    Page = "profile"
)

const (
	MetricTypeSessionStart MetricType = "session_start"
	MetricTypeContentView  MetricType = "content_views"
)

type AnalyticsEventWrapper struct {
	Type      string          `json:"_type"`
	Timestamp *float64        `json:"timestamp,omitempty"`
	Raw       json.RawMessage `json:"-"`
} // @name AnalyticsEventWrapper

func (w *AnalyticsEventWrapper) UnmarshalJSON(data []byte) error {
	type Alias AnalyticsEventWrapper
	aux := &struct {
		*Alias
	}{
		Alias: (*Alias)(w),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	w.Raw = data
	return nil
}

type PostAnalyticsResponse struct {
	Status string `json:"status"`
} // @name PostAnalyticsResponse

type ContentViewRequest struct {
	ContentID            string      `json:"content_id"`
	ContentType          ContentType `json:"content_type"`
	FeedID               *string     `json:"feed_id,omitempty"`
	PostID               *string     `json:"post_id,omitempty"`
	ViewType             ViewType    `json:"view_type"`
	WatchDurationMs      float64     `json:"watch_duration_ms"`
	Page                 Page        `json:"page"`
	VideoPositionMs      *float64    `json:"video_position_ms,omitempty"`
	VideoTotalDurationMs *float64    `json:"video_total_duration_ms,omitempty"`
	Segments             []Segment   `json:"segments,omitempty"`
	DeviceID             string      `json:"device_id,omitempty"`
	Country              string      `json:"country,omitempty"`
} // @name ContentViewRequest

type EngagementRequest struct {
	EngagementType string     `json:"engagement_type"`
	ResourceType   string     `json:"resource_type"`
	ResourceID     string     `json:"resource_id"`
	Page           string     `json:"page"`
	CommentText    *string    `json:"comment_text,omitempty"`
	SharePlatform  *string    `json:"share_platform,omitempty"`
	Country        string     `json:"country,omitempty"`
	DeviceType     DeviceType `json:"device_type,omitempty"`
} // @name EngagementRequest

type InteractionRequest struct {
	InteractionType string     `json:"interaction_type"`
	ElementType     string     `json:"element_type"`
	ElementID       *string    `json:"element_id,omitempty"`
	SessionID       string     `json:"session_id,omitempty"`
	Page            string     `json:"page"`
	PageURL         string     `json:"page_url"`
	ScrollDepth     *float32   `json:"scroll_depth,omitempty"`
	SearchQuery     *string    `json:"search_query,omitempty"`
	ClickX          *int32     `json:"click_x,omitempty"`
	ClickY          *int32     `json:"click_y,omitempty"`
	DeviceType      DeviceType `json:"device_type,omitempty"`
	Browser         string     `json:"browser,omitempty"`
} // @name InteractionRequest

type ErrorRequest struct {
	ErrorType    string     `json:"error_type"`
	ErrorCode    *string    `json:"error_code,omitempty"`
	ErrorMessage string     `json:"error_message"`
	StackTrace   *string    `json:"stack_trace,omitempty"`
	ResourceType *string    `json:"resource_type,omitempty"`
	ResourceID   *string    `json:"resource_id,omitempty"`
	Endpoint     *string    `json:"endpoint,omitempty"`
	SessionID    string     `json:"session_id,omitempty"`
	DeviceType   DeviceType `json:"device_type,omitempty"`
	Browser      string     `json:"browser,omitempty"`
	OS           string     `json:"os,omitempty"`
} // @name ErrorRequest

type SessionStartRequest struct {
	UtmSource        string  `json:"utm_source,omitempty"`
	UtmCampaign      string  `json:"utm_campaign,omitempty"`
	Browser          string  `json:"browser,omitempty"`
	Language         string  `json:"language,omitempty"`
	ScreenResolution string  `json:"screen_resolution,omitempty"`
	Platform         string  `json:"platform,omitempty"`
	TgPlatform       string  `json:"tg_platform,omitempty"`
	TgVersion        string  `json:"tg_version,omitempty"`
	Timezone         string  `json:"timezone,omitempty"`
	TimezoneOffset   float64 `json:"timezone_offset,omitempty"`
	ColorDepth       float64 `json:"color_depth,omitempty"`
	TouchSupport     bool    `json:"touch_support,omitempty"`
	Country          string  `json:"country,omitempty"`
	UserID           string  `json:"user_id,omitempty"`
} // @name SessionStartRequest

type Segment struct {
	StartMs uint64  `json:"start_ms"`
	EndMs   uint64  `json:"end_ms"`
	Speed   float64 `json:"speed"`
} // @name Segment

type SegmentEvent struct {
	EventID        uuid.UUID
	VideoID        string
	UserID         string
	SegmentStartMs uint64
	SegmentEndMs   uint64
	Speed          float64
	Timestamp      time.Time
}

func (s SegmentEvent) GetType() string {
	return "video_segment_events"
}

func (s SegmentEvent) ToSlice() []interface{} {
	return []interface{}{
		s.EventID,
		s.VideoID,
		s.UserID,
		s.SegmentStartMs,
		s.SegmentEndMs,
		s.Speed,
		s.Timestamp,
	}
}

type ContentViewValue struct {
	EventID              uuid.UUID
	ResourceType         ResourceType
	ResourceID           string
	ContentID            string
	ContentType          ContentType
	UserID               string
	FeedID               *string
	PostID               *string
	PostType             *ContentType
	VideoID              *string
	ViewType             ViewType
	WatchDurationMs      uint64
	Page                 Page
	Country              string
	VideoPositionMs      *uint64
	VideoTotalDurationMs *uint64
	Segments             []Segment
	DeviceID             string
	Timestamp            time.Time
}

func (v ContentViewValue) ToSlice() []interface{} {
	var feedID, postID, postType, videoID interface{}
	if v.FeedID != nil {
		feedID = *v.FeedID
	}
	if v.PostID != nil {
		postID = *v.PostID
	}
	if v.PostType != nil {
		postType = string(*v.PostType)
	}
	if v.VideoID != nil {
		videoID = *v.VideoID
	}

	return []interface{}{
		v.EventID,
		string(v.ResourceType),
		v.ResourceID,
		v.ContentID,
		string(v.ContentType),
		v.UserID,
		feedID,
		postID,
		postType,
		videoID,
		string(v.ViewType),
		v.WatchDurationMs,
		string(v.Page),
		v.Country,
		v.VideoPositionMs,
		v.VideoTotalDurationMs,
		segmentsToClickHouse(v.Segments),
		v.DeviceID,
		v.Timestamp,
	}
}

func segmentsToClickHouse(segments []Segment) []interface{} {
	if len(segments) == 0 {
		return []interface{}{}
	}
	result := make([]interface{}, len(segments))
	for i, s := range segments {
		result[i] = []interface{}{s.StartMs, s.EndMs, s.Speed}
	}
	return result
}

func (v ContentViewValue) GetType() string {
	return string(MetricTypeContentView)
}

func (v ContentViewValue) Validate() error {
	switch v.ContentType {
	case ContentTypeVideo, ContentTypeImage:
	default:
		return errors.New("invalid content type")
	}

	switch v.ViewType {
	case ViewTypeStart, ViewTypeWatch, ViewTypeEnd:
	default:
		return errors.New("invalid view type")
	}

	switch v.Page {
	case PageProfile, PageFeed, PageStandalone:
	default:
		return errors.New("invalid page")
	}

	return nil
}

type SessionStartValue struct {
	SessionID        uuid.UUID
	UserID           string
	UtmSource        string
	UtmCampaign      string
	Browser          string
	Language         string
	ScreenResolution string
	Platform         string
	TgPlatform       string
	TgVersion        string
	TimezoneOffset   int
	Timezone         string
	Country          string
	ColorDepth       int
	TouchSupport     bool
	Timestamp        time.Time
}

func (s SessionStartValue) ToSlice() []interface{} {
	return []interface{}{
		s.SessionID, s.UserID, s.UtmSource, s.UtmCampaign, s.Browser, s.Language,
		s.ScreenResolution, s.Platform, s.TgPlatform, s.TgVersion,
		s.TimezoneOffset, s.Timezone, s.Country, s.ColorDepth,
		s.TouchSupport, s.Timestamp,
	}
}

func (s SessionStartValue) GetType() string {
	return string(MetricTypeSessionStart)
}

type UserProperty struct {
	UserID        string    `json:"user_id"`
	PropertyName  string    `json:"property_name"`
	PropertyValue string    `json:"property_value"`
	Timestamp     time.Time `json:"timestamp"`
}

type SetUserPropertiesRequest struct {
	UserID     string            `json:"user_id"`
	Properties map[string]string `json:"properties"`
} // @name SetUserPropertiesRequest

type UserProfile struct {
	UserID     string            `json:"user_id"`
	Properties map[string]string `json:"properties"`
	FirstSeen  time.Time         `json:"first_seen"`
	LastSeen   time.Time         `json:"last_seen"`
} // @name UserProfile

type FunnelStep struct {
	Name      string            `json:"name"`
	EventType string            `json:"event_type"`
	PageType  Page              `json:"page_type,omitempty"`
	Filters   map[string]string `json:"filters,omitempty"`
}

type FunnelRequest struct {
	Steps      []FunnelStep `json:"steps"`
	TimeWindow int          `json:"time_window"`
	StartDate  string       `json:"start_date,omitempty"`
	EndDate    string       `json:"end_date,omitempty"`
} // @name FunnelRequest

type FunnelStepResult struct {
	StepName       string  `json:"step_name"`
	UserCount      int     `json:"user_count"`
	ConversionRate float64 `json:"conversion_rate"`
	DropoffRate    float64 `json:"dropoff_rate"`
}

type FunnelAnalytics struct {
	TotalUsers       int                `json:"total_users"`
	CompletedUsers   int                `json:"completed_users"`
	CompletionRate   float64            `json:"completion_rate"`
	Steps            []FunnelStepResult `json:"steps"`
	AverageTimeHours float64            `json:"average_time_hours"`
} // @name FunnelAnalytics

type RetentionPeriod string

const (
	RetentionPeriodDay   RetentionPeriod = "day"
	RetentionPeriodWeek  RetentionPeriod = "week"
	RetentionPeriodMonth RetentionPeriod = "month"
)

type RetentionRequest struct {
	Period    RetentionPeriod `json:"period"`
	StartDate string          `json:"start_date,omitempty"`
	EndDate   string          `json:"end_date,omitempty"`
}

type RetentionCohort struct {
	CohortDate    string    `json:"cohort_date"`
	CohortSize    int       `json:"cohort_size"`
	RetentionData []float64 `json:"retention_data"`
}

type RetentionAnalytics struct {
	Period  RetentionPeriod   `json:"period"`
	Cohorts []RetentionCohort `json:"cohorts"`
} // @name RetentionAnalytics

type RealtimeStats struct {
	Timestamp       time.Time      `json:"timestamp"`
	ActiveUsers     uint64         `json:"active_users"`
	EventsPerMinute uint64         `json:"events_per_minute"`
	TopEvents       []EventCount   `json:"top_events"`
	TopCountries    []CountryCount `json:"top_countries"`
	RecentEvents    []RecentEvent  `json:"recent_events"`
} // @name RealtimeStats

type EventCount struct {
	EventType ViewType `json:"event_type"`
	Count     uint64   `json:"count"`
}

type CountryCount struct {
	Country string `json:"country"`
	Count   uint64 `json:"count"`
}

type RecentEvent struct {
	EventType ViewType  `json:"event_type"`
	UserID    string    `json:"user_id"`
	ContentID string    `json:"content_id,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type EventWithProperties struct {
	EventID    string            `json:"event_id"`
	EventType  string            `json:"event_type"`
	ResourceID string            `json:"resource_id"`
	Properties map[string]string `json:"properties"`
	Timestamp  time.Time         `json:"timestamp"`
}

type TopContentItemType string

const (
	TopContentItemTypeVideo TopContentItemType = "video"
	TopContentItemTypeImage TopContentItemType = "image"
	TopContentItemTypePost  TopContentItemType = "post"
)

type VideoStats struct {
	VideoID          string            `json:"video_id"`
	TotalViews       uint64            `json:"total_views"`
	UniqueViewers    uint64            `json:"unique_viewers"`
	AvgWatchTimeMs   float64           `json:"avg_watch_time_ms"`
	TotalWatchTimeMs uint64            `json:"total_watch_time_ms"`
	Starts           uint64            `json:"starts"`
	Watches          uint64            `json:"watches"`
	Completions      uint64            `json:"completions"`
	CompletionRate   float64           `json:"completion_rate"`
	ViewsByPage      map[string]uint64 `json:"views_by_page,omitempty"`
} // @name VideoStats

type PostStats struct {
	PostID           string            `json:"post_id"`
	FeedID           string            `json:"feed_id,omitempty"`
	ContentType      ContentType       `json:"content_type"`
	TotalViews       uint64            `json:"total_views"`
	UniqueViewers    uint64            `json:"unique_viewers"`
	AvgWatchTimeMs   float64           `json:"avg_watch_time_ms"`
	TotalWatchTimeMs uint64            `json:"total_watch_time_ms"`
	Starts           uint64            `json:"starts"`
	Completions      uint64            `json:"completions"`
	CompletionRate   float64           `json:"completion_rate"`
	ViewsByPage      map[string]uint64 `json:"views_by_page,omitempty"`
} // @name PostStats

type FeedStats struct {
	FeedID           string  `json:"feed_id"`
	TotalViews       uint64  `json:"total_views"`
	UniqueViewers    uint64  `json:"unique_viewers"`
	TotalPosts       uint64  `json:"total_posts_viewed"`
	AvgTimePerVisit  float64 `json:"avg_time_per_visit_ms"`
	TotalWatchTimeMs uint64  `json:"total_watch_time_ms"`
} // @name FeedStats

type TopContentItem struct {
	ID             string             `json:"id"`
	Type           TopContentItemType `json:"type"`
	TotalViews     uint64             `json:"total_views"`
	UniqueViewers  uint64             `json:"unique_viewers"`
	CompletionRate float64            `json:"completion_rate,omitempty"`
} // @name TopContentItem

type TopVideosResponse struct {
	Videos []VideoStats `json:"videos"`
} // @name TopVideosResponse

type TopPostsResponse struct {
	Posts []PostStats `json:"posts"`
} // @name TopPostsResponse

type TopFeedsResponse struct {
	Feeds []FeedStats `json:"feeds"`
} // @name TopFeedsResponse

type EngagementType string

const (
	EngagementTypeLike     EngagementType = "like"
	EngagementTypeUnlike   EngagementType = "unlike"
	EngagementTypeShare    EngagementType = "share"
	EngagementTypeComment  EngagementType = "comment"
	EngagementTypeSave     EngagementType = "save"
	EngagementTypeUnsave   EngagementType = "unsave"
	EngagementTypeFollow   EngagementType = "follow"
	EngagementTypeUnfollow EngagementType = "unfollow"
	EngagementTypeReport   EngagementType = "report"
	EngagementTypeHide     EngagementType = "hide"
)

type EngagementResourceType string

const (
	EngagementResourceVideo   EngagementResourceType = "video"
	EngagementResourcePost    EngagementResourceType = "post"
	EngagementResourceFeed    EngagementResourceType = "feed"
	EngagementResourceUser    EngagementResourceType = "user"
	EngagementResourceComment EngagementResourceType = "comment"
)

type EngagementEvent struct {
	EventID        uuid.UUID
	EngagementType EngagementType
	ResourceType   EngagementResourceType
	ResourceID     string
	UserID         string
	PageType       Page
	CommentText    *string
	SharePlatform  *string
	Country        string
	DeviceType     DeviceType
	Timestamp      time.Time
}

func (e EngagementEvent) GetType() string {
	return "engagement_events"
}

func (e EngagementEvent) ToSlice() []interface{} {
	var commentText, sharePlatform interface{}
	if e.CommentText != nil {
		commentText = *e.CommentText
	}
	if e.SharePlatform != nil {
		sharePlatform = *e.SharePlatform
	}

	return []interface{}{
		e.EventID,
		string(e.EngagementType),
		string(e.ResourceType),
		e.ResourceID,
		e.UserID,
		string(e.PageType),
		commentText,
		sharePlatform,
		e.Country,
		e.DeviceType,
		e.Timestamp,
	}
}

type InteractionType string

const (
	InteractionTypeClick  InteractionType = "click"
	InteractionTypeScroll InteractionType = "scroll"
	InteractionTypeHover  InteractionType = "hover"
	InteractionTypeFocus  InteractionType = "focus"
	InteractionTypeBlur   InteractionType = "blur"
	InteractionTypeSearch InteractionType = "search"
	InteractionTypeFilter InteractionType = "filter"
)

type InteractionEvent struct {
	EventID         uuid.UUID
	InteractionType InteractionType
	ElementType     string
	ElementID       *string
	UserID          string
	SessionID       uuid.UUID
	PageType        Page
	PageURL         string
	ScrollDepth     *float32
	SearchQuery     *string
	ClickPositionX  *int32
	ClickPositionY  *int32
	DeviceType      DeviceType
	Browser         string
	Timestamp       time.Time
}

func (i InteractionEvent) GetType() string {
	return "interaction_events"
}

func (i InteractionEvent) ToSlice() []interface{} {
	var elementID, scrollDepth, searchQuery, clickX, clickY interface{}
	if i.ElementID != nil {
		elementID = *i.ElementID
	}
	if i.ScrollDepth != nil {
		scrollDepth = *i.ScrollDepth
	}
	if i.SearchQuery != nil {
		searchQuery = *i.SearchQuery
	}
	if i.ClickPositionX != nil {
		clickX = *i.ClickPositionX
	}
	if i.ClickPositionY != nil {
		clickY = *i.ClickPositionY
	}

	return []interface{}{
		i.EventID,
		string(i.InteractionType),
		i.ElementType,
		elementID,
		i.UserID,
		i.SessionID,
		string(i.PageType),
		i.PageURL,
		scrollDepth,
		searchQuery,
		clickX,
		clickY,
		i.DeviceType,
		i.Browser,
		i.Timestamp,
	}
}

type ErrorType string

const (
	ErrorTypePlayback         ErrorType = "playback_error"
	ErrorTypeUpload           ErrorType = "upload_error"
	ErrorTypeAPI              ErrorType = "api_error"
	ErrorTypeNetwork          ErrorType = "network_error"
	ErrorTypeTimeout          ErrorType = "timeout"
	ErrorTypeNotFound         ErrorType = "not_found"
	ErrorTypePermissionDenied ErrorType = "permission_denied"
	ErrorTypeValidation       ErrorType = "validation_error"
)

type ErrorEvent struct {
	EventID      uuid.UUID
	ErrorType    ErrorType
	ErrorCode    *string
	ErrorMessage string
	StackTrace   *string
	ResourceType *string
	ResourceID   *string
	Endpoint     *string
	UserID       string
	SessionID    uuid.UUID
	DeviceType   DeviceType
	Browser      string
	OS           string
	Timestamp    time.Time
}

func (e ErrorEvent) GetType() string {
	return "error_events"
}

func (e ErrorEvent) ToSlice() []interface{} {
	var errorCode, stackTrace, resourceType, resourceID, endpoint interface{}
	if e.ErrorCode != nil {
		errorCode = *e.ErrorCode
	}
	if e.StackTrace != nil {
		stackTrace = *e.StackTrace
	}
	if e.ResourceType != nil {
		resourceType = *e.ResourceType
	}
	if e.ResourceID != nil {
		resourceID = *e.ResourceID
	}
	if e.Endpoint != nil {
		endpoint = *e.Endpoint
	}

	return []interface{}{
		e.EventID,
		string(e.ErrorType),
		errorCode,
		e.ErrorMessage,
		stackTrace,
		resourceType,
		resourceID,
		endpoint,
		e.UserID,
		e.SessionID,
		e.DeviceType,
		e.Browser,
		e.OS,
		e.Timestamp,
	}
}

type EngagementStats struct {
	ResourceType      EngagementResourceType `json:"resource_type"`
	ResourceID        string                 `json:"resource_id"`
	Likes             uint64                 `json:"likes"`
	Unlikes           uint64                 `json:"unlikes"`
	NetLikes          int64                  `json:"net_likes"`
	Shares            uint64                 `json:"shares"`
	Comments          uint64                 `json:"comments"`
	Saves             uint64                 `json:"saves"`
	TotalEngagements  uint64                 `json:"total_engagements"`
	UniqueUsers       uint64                 `json:"unique_users"`
	EngagementRate    float64                `json:"engagement_rate,omitempty"`
	EngagementsByType map[string]uint64      `json:"engagements_by_type,omitempty"`
} // @name EngagementStats

type UserEngagementStats struct {
	UserID       string `json:"user_id"`
	LikesGiven   uint64 `json:"likes_given"`
	SharesMade   uint64 `json:"shares_made"`
	CommentsMade uint64 `json:"comments_made"`
	SavesMade    uint64 `json:"saves_made"`
	FollowsMade  uint64 `json:"follows_made"`
	TotalActions uint64 `json:"total_actions"`
} // @name UserEngagementStats

type VideoHeatmap struct {
	VideoID         string    `json:"video_id"`
	TotalDurationMs uint64    `json:"total_duration_ms"`
	Data            []float64 `json:"data"`
} // @name VideoHeatmap

type HotSegment struct {
	StartSecond int     `json:"start_second"`
	EndSecond   int     `json:"end_second"`
	Multiplier  float64 `json:"multiplier"`
} // @name HotSegment

type HeatmapProcessed struct {
	VideoID         string    `json:"video_id"`
	TotalDurationMs uint64    `json:"total_duration_ms"`
	Points          []float64 `json:"points"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type Interval string

const (
	Interval1m Interval = "1m"
	Interval1h Interval = "1h"
	Interval1d Interval = "1d"
)

type DashboardStatsRequest struct {
	TimeStart time.Time `json:"time_start"`
	TimeEnd   time.Time `json:"time_end"`
	Interval  Interval  `json:"interval"`
} // @name DashboardStatsRequest

type DashboardPoint struct {
	Timestamp   time.Time `json:"timestamp"`
	Views       uint64    `json:"views"`
	UniqueUsers uint64    `json:"unique_users"`
} // @name DashboardPoint

type DashboardStatsResponse struct {
	Points []DashboardPoint `json:"points"`
} // @name DashboardStatsResponse



// dummy.
INSERT INTO content_views (
    event_id, resource_type, resource_id, content_id, content_type,
    user_id, feed_id, post_id, post_type, video_id, view_type,
    watch_duration_ms, page, country, video_position_ms,
    video_total_duration_ms, watched_segments, device_id, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    (CASE WHEN rand() % 2 = 0 THEN 'video' ELSE ['post', 'article'][rand() % 2 + 1] END) AS resource_type,
    substring(replaceAll(replaceAll(base64Encode(toString(generateUUIDv4())), '+', 'X'), '/', 'Y'), 1, 11) AS resource_id,
    (CASE WHEN rand() % 2 = 0 THEN arrayElement(['FpzVPNx1cG','Bq4y3QB38S','VI9VXQxWXQ','XyZ9aB8cD1','AbCdE12345','QwErTy1234','LmNoPqR678','Z9Y8X7W6V5','Tg6Rf4e2W1','Mn0bVc9xZ8'], toUInt32(rand() % 10 + 1)) ELSE substring(replaceAll(replaceAll(base64Encode(toString(generateUUIDv4())), '+', 'X'), '/', 'Y'), 1, 11) END) AS content_id,
    (CASE WHEN rand() % 2 = 0 THEN 'video' ELSE ['image', 'text'][rand() % 2 + 1] END) AS content_type,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    if(rand() % 3 = 0, NULL, arrayElement(['fE3d4R5t6Y','gH7j8K9l0M','nP1q2W3e4R','tY5u6I7o8P','aS9d0F1g2H'], toUInt32(rand() % 5 + 1))) AS feed_id,
    if(rand() % 3 = 0, NULL, arrayElement(['pS1t2N3m4L','qW5e6R7t8Y','uI9o0P1a2S','dF3g4H5j6K','lZ7x8C9v0B'], toUInt32(rand() % 5 + 1))) AS post_id,
    if(post_id IS NULL, NULL, arrayElement(['news','meme','ad'], toUInt32(rand() % 3 + 1))) AS post_type,
    (CASE WHEN content_type = 'video' THEN content_id ELSE NULL END) AS video_id,
    arrayElement(['start','watch','end','impression'], toUInt32(rand() % 4 + 1)) AS view_type,
    rand() % 60000 AS watch_duration_ms,
    arrayElement(['home','profile','explore','feed','video_detail'], toUInt32(rand() % 5 + 1)) AS page,
    arrayElement(['US','UK','CA','DE','FR','JP'], toUInt32(rand() % 6 + 1)) AS country,
    if(rand() % 3 = 0, NULL, rand() % 30000) AS video_position_ms,
    60000 AS video_total_duration_ms,
    [tuple(toUInt64(1000), toUInt64(5000), 1.0), tuple(toUInt64(10000), toUInt64(15000), 1.5)] AS watched_segments,
    arrayElement(['dV1c2X3z4A','eW5b6N7m8Q','fR9t0Y1u2I','gH3j4K5l6P','hS7d8F9g0J'], toUInt32(rand() % 5 + 1)) AS device_id,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(10000);

INSERT INTO session_starts (
    session_id, user_id, utm_source, utm_campaign, browser,
    language, screen_resolution, platform, tg_platform, tg_version,
    timezone_offset, timezone, country, color_depth, touch_support, timestamp
)
SELECT
    generateUUIDv4() AS session_id,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    ['google', 'direct', 'twitter', 'facebook'][rand() % 4 + 1] AS utm_source,
    ['summer_sale', 'black_friday', 'welcome'][rand() % 3 + 1] AS utm_campaign,
    ['Chrome', 'Firefox', 'Safari', 'Edge'][rand() % 4 + 1] AS browser,
    ['en', 'es', 'fr', 'de'][rand() % 4 + 1] AS language,
    ['1920x1080', '1366x768', '360x640'][rand() % 3 + 1] AS screen_resolution,
    ['web', 'ios', 'android'][rand() % 3 + 1] AS platform,
    ['web', 'app', 'desktop'][rand() % 3 + 1] AS tg_platform,
    '7.0.0' AS tg_version,
    -480 AS timezone_offset,
    'America/Los_Angeles' AS timezone,
    ['US', 'UK', 'CA', 'DE'][rand() % 4 + 1] AS country,
    24 AS color_depth,
    rand() % 2 AS touch_support,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(5000);

INSERT INTO content_views (
    event_id, resource_type, resource_id, content_id, content_type,
    user_id, feed_id, post_id, post_type, video_id, view_type,
    watch_duration_ms, page, country, video_position_ms,
    video_total_duration_ms, watched_segments, device_id, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    'video' AS resource_type,
    substring(replaceAll(replaceAll(base64Encode(toString(generateUUIDv4())), '+', 'X'), '/', 'Y'), 1, 11) AS resource_id,
    arrayElement(['FpzVPNx1cG','Bq4y3QB38S','VI9VXQxWXQ','XyZ9aB8cD1','AbCdE12345','QwErTy1234','LmNoPqR678','Z9Y8X7W6V5','Tg6Rf4e2W1','Mn0bVc9xZ8'], toUInt32(rand() % 10 + 1)) AS content_id,
    'video' AS content_type,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN0oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    arrayElement(['fE3d4R5t6Y','gH7j8K9l0M','nP1q2W3e4R','tY5u6I7o8P','aS9d0F1g2H'], toUInt32(rand() % 5 + 1)) AS feed_id,
    arrayElement(['pS1t2N3m4L','qW5e6R7t8Y','uI9o0P1a2S','dF3g4H5j6K','lZ7x8C9v0B'], toUInt32(rand() % 5 + 1)) AS post_id,
    arrayElement(['news','meme','ad'], toUInt32(rand() % 3 + 1)) AS post_type,
    content_id AS video_id,
    'watch' AS view_type,
    10000 + rand() % 50000 AS watch_duration_ms,
    arrayElement(['home','feed','video_detail'], toUInt32(rand() % 3 + 1)) AS page,
    arrayElement(['US','UK','CA','DE','FR','JP'], toUInt32(rand() % 6 + 1)) AS country,
    rand() % 59000 AS video_position_ms,
    60000 AS video_total_duration_ms,
    -- Generate 1-3 watched segments per row
    arrayMap(i -> tuple(toUInt64((i*5000) + (rand()%4000)), toUInt64((i*5000) + 4000 + (rand()%4000)), toFloat64([1.0,1.25,1.5,2.0][rand() % 4 + 1])), range(1 + (rand()%3))) AS watched_segments,
    arrayElement(['dV1c2X3z4A','eW5b6N7m8Q','fR9t0Y1u2I','gH3j4K5l6P','hS7d8F9g0J'], toUInt32(rand() % 5 + 1)) AS device_id,
    now() - toUInt32(rand() % (86400 * 14)) AS timestamp
FROM numbers(15000);

-- Precompute/seed processed heatmap curves so endpoints can return immediately
INSERT INTO video_heatmap_processed (video_id, total_duration_ms, points, updated_at)
SELECT
    vid AS video_id,
    60000 AS total_duration_ms,
    arrayMap(x -> toFloat64(50) + 40 * sin(toFloat64(x)/8) + (rand()%10), range(101)) AS points,
    now() AS updated_at
FROM (
    SELECT arrayJoin(['FpzVPNx1cG','Bq4y3QB38S','VI9VXQxWXQ','XyZ9aB8cD1','AbCdE12345','QwErTy1234','LmNoPqR678','Z9Y8X7W6V5','Tg6Rf4e2W1','Mn0bVc9xZ8']) AS vid
);

INSERT INTO engagement_events (
    event_id, engagement_type, resource_type, resource_id, user_id,
    page_type, comment_text, share_platform, country, device_type, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    ['like', 'comment', 'share', 'save'][rand() % 4 + 1] AS engagement_type,
    ['post', 'video'][rand() % 2 + 1] AS resource_type,
    substring(replaceAll(replaceAll(base64Encode(toString(generateUUIDv4())), '+', 'X'), '/', 'Y'), 1, 11) AS resource_id,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    ['feed', 'post_detail'][rand() % 2 + 1] AS page_type,
    if(rand() % 10 = 0, 'Great content!', NULL) AS comment_text,
    if(rand() % 10 = 0, 'twitter', NULL) AS share_platform,
    ['US', 'UK', 'CA'][rand() % 3 + 1] AS country,
    ['mobile', 'desktop', 'tablet'][rand() % 3 + 1] AS device_type,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(8000);

INSERT INTO interaction_events (
    event_id, interaction_type, element_type, element_id, user_id,
    session_id, page_type, page_url, scroll_depth, search_query,
    click_position_x, click_position_y, device_type, browser, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    ['click', 'scroll', 'hover', 'search'][rand() % 4 + 1] AS interaction_type,
    ['button', 'link', 'card'][rand() % 3 + 1] AS element_type,
    concat('el_', substring(base64Encode(toString(generateUUIDv4())), 1, 5)) AS element_id,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    generateUUIDv4() AS session_id,
    ['home', 'feed'][rand() % 2 + 1] AS page_type,
    '/home' AS page_url,
    rand() % 100 / 100.0 AS scroll_depth,
    if(rand() % 20 = 0, 'funny cats', NULL) AS search_query,
    rand() % 1000 AS click_position_x,
    rand() % 800 AS click_position_y,
    ['mobile', 'desktop'][rand() % 2 + 1] AS device_type,
    ['Chrome', 'Safari'][rand() % 2 + 1] AS browser,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(10000);

INSERT INTO error_events (
    event_id, error_type, error_code, error_message, stack_trace,
    resource_type, resource_id, endpoint, user_id, session_id,
    device_type, browser, os, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    ['api_error', 'js_error', 'crash'][rand() % 3 + 1] AS error_type,
    toString(400 + rand() % 104) AS error_code,
    'Something went wrong' AS error_message,
    'Error at line 10...' AS stack_trace,
    NULL, NULL, '/api/v1/feed',
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    generateUUIDv4() AS session_id,
    ['mobile', 'desktop'][rand() % 2 + 1] AS device_type,
    ['Chrome', 'Safari'][rand() % 2 + 1] AS browser,
    ['iOS', 'Android', 'Windows', 'macOS'][rand() % 4 + 1] AS os,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(500);

INSERT INTO user_properties (
    user_id, property_name, property_value, property_type, timestamp
)
SELECT
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    ['is_premium', 'has_avatar', 'theme'][rand() % 3 + 1] AS property_name,
    ['true', 'false', 'dark', 'light'][rand() % 4 + 1] AS property_value,
    'string' AS property_type,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(1000);

INSERT INTO video_segment_events (
    event_id, video_id, user_id, segment_start_ms, segment_end_ms, speed, timestamp
)
SELECT
    generateUUIDv4() AS event_id,
    arrayElement(['FpzVPNx1cG','Bq4y3QB38S','VI9VXQxWXQ','XyZ9aB8cD1','AbCdE12345','QwErTy1234','LmNoPqR678','Z9Y8X7W6V5','Tg6Rf4e2W1','Mn0bVc9xZ8'], toUInt32(rand() % 10 + 1)) AS video_id,
    arrayElement(['u1a2B3c4D5','v6e7F8g9H0','kLmN9oPq12','rS3t4U5v6W','xYz1A2b3C4','d5E6f7G8h9','iJkL0mN1o2','pQ3r4S5t6U','v7W8x9Y0zA','bB1cC2dD3e','fF4gG5hH6i','jJ7kK8lL9m','nN0oO1pP2q','rR3sS4tT5u','vV6wW7xX8y','zZ9aA0bB1c','dD2eE3fF4g','hH5iI6jJ7k','lL8mM9nN0o','pP1qQ2rR3s','tT4uU5vV6w','xX7yY8zZ9a','bB0cC1dD2e','fF3gG4hH5i','jJ6kK7lL8m','nN9oO0pP1q','rR2sS3tT4u','vV5wW6xX7y','zZ8aA9bB0c','dD1eE2fF3g','hH4iI5jJ6k','lL7mM8nN9o','pP0qQ1rR2s','tT3uU4vV5w','xX6yY7zZ8a','bB9cC0dD1e','fF2gG3hH4i','jJ5kK6lL7m','nN8oO9pP0q','rR1sS2tT3u','vV4wW5xX6y','zZ7aA8bB9c','dD0eE1fF2g','hH3iI4jJ5k','lL6mM7nN8o','pP9qQ0rR1s','tT2uU3vV4w','xX5yY6zZ7a','bB8cC9dD0e'], toUInt32(rand() % 50 + 1)) AS user_id,
    toUInt64(rand() % 50000) AS segment_start_ms,
    toUInt64(rand() % 50000 + 5000) AS segment_end_ms,
    [1.0, 1.25, 1.5, 2.0][rand() % 4 + 1] AS speed,
    now() - rand() % (86400 * 30) AS timestamp
FROM numbers(5000);


//bash
#!/bin/bash
set -e

# Configuration
# Default container name for ClickHouse in many Docker Compose setups is 'clickhouse'
# or sometimes 'analytics-db'. Adjust key matching if needed.
CONTAINER_NAME="clickhouse"

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running."
    exit 1
fi

# Find the ClickHouse container ID
echo "Finding ClickHouse container..."
CONTAINER_ID=$(docker ps -qf "name=${CONTAINER_NAME}")

if [ -z "$CONTAINER_ID" ]; then
    echo "Error: ClickHouse container not found with name '${CONTAINER_NAME}'. Is it running via 'docker compose up'?"
    echo "Searching for any container with 'clickhouse' in the name..."
    CONTAINER_ID=$(docker ps -qf "name=clickhouse")
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "Searching for ClickHouse server image..."
    CONTAINER_ID=$(docker ps -qf "ancestor=clickhouse/clickhouse-server")
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "Error: No ClickHouse container found. Please ensure Docker Compose is running with the clickhouse service."
    echo "Run: docker-compose up -d clickhouse"
    exit 1
fi

echo "Found ClickHouse container: $CONTAINER_ID"

# Paths to the SQL files (relative to this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="${SCRIPT_DIR}/dummy_data.sql"
SCHEMA_FILE="${SCRIPT_DIR}/click/tables.sql"

# Optional: pass --reset to truncate analytics tables before loading
RESET=false
if [[ "$1" == "--reset" ]]; then
  RESET=true
fi

if [ ! -f "$SQL_FILE" ]; then
    echo "Error: SQL file not found at $SQL_FILE"
    exit 1
fi

# Ensure analytics schema exists (tables + MVs)
if [ -f "$SCHEMA_FILE" ]; then
  echo "Applying ClickHouse analytics schema..."
  cat "$SCHEMA_FILE" | docker exec -i "$CONTAINER_ID" clickhouse-client --user clickhouse --password clickhouse -n
fi

# Optionally truncate tables for a clean reload
if [ "$RESET" = true ]; then
  echo "Truncating analytics tables (reset)..."
  docker exec -i "$CONTAINER_ID" clickhouse-client --user clickhouse --password clickhouse -n <<'SQL'
TRUNCATE TABLE IF EXISTS content_views;
TRUNCATE TABLE IF EXISTS session_starts;
TRUNCATE TABLE IF EXISTS engagement_events;
TRUNCATE TABLE IF EXISTS interaction_events;
TRUNCATE TABLE IF EXISTS error_events;
TRUNCATE TABLE IF EXISTS user_properties;
TRUNCATE TABLE IF EXISTS video_segment_events;
TRUNCATE TABLE IF EXISTS video_heatmap_stats;
TRUNCATE TABLE IF EXISTS video_heatmap_per_second;
TRUNCATE TABLE IF EXISTS video_heatmap_processed;
SQL
fi

# Run the SQL script to insert data
echo "Inserting dummy analytics data..."
cat "$SQL_FILE" | docker exec -i "$CONTAINER_ID" clickhouse-client --user clickhouse --password clickhouse -n

echo "Done! Dummy data inserted."
