-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    segment VARCHAR(50) DEFAULT 'standard',
    lifetime_value DECIMAL(12, 2) DEFAULT 0,
    satisfaction_score DECIMAL(3, 1),
    total_interactions INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_customer_id ON customers(customer_id);
CREATE INDEX idx_customers_segment ON customers(segment);
CREATE INDEX idx_customers_satisfaction ON customers(satisfaction_score DESC);

-- Departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_departments_code ON departments(code);

-- Agents table
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(100) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    avatar_url TEXT,
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMPTZ,
    performance_score DECIMAL(5, 2) DEFAULT 0,
    csat_score DECIMAL(5, 2) DEFAULT 0,
    tickets_solved_total INTEGER DEFAULT 0,
    fcr_rate DECIMAL(5, 2) DEFAULT 0,
    avg_handle_time DECIMAL(6, 2) DEFAULT 0,
    open_tickets INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agents_department ON agents(department_id);
CREATE INDEX idx_agents_performance ON agents(performance_score DESC);
CREATE INDEX idx_agents_is_online ON agents(is_online);

-- Agent badges table
CREATE TABLE agent_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    badge_name VARCHAR(100) NOT NULL,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_badges_agent ON agent_badges(agent_id);

-- Call recordings table
CREATE TABLE call_recordings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    file_format VARCHAR(10) NOT NULL,
    file_size BIGINT,
    duration VARCHAR(10),
    transcript TEXT,
    sentiment VARCHAR(20),
    sentiment_confidence DECIMAL(5, 2),
    status VARCHAR(20) DEFAULT 'pending',
    call_timestamp TIMESTAMPTZ NOT NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_call_recordings_customer ON call_recordings(customer_id);
CREATE INDEX idx_call_recordings_agent ON call_recordings(agent_id);
CREATE INDEX idx_call_recordings_sentiment ON call_recordings(sentiment);
CREATE INDEX idx_call_recordings_status ON call_recordings(status);
CREATE INDEX idx_call_recordings_timestamp ON call_recordings(call_timestamp DESC);

-- Topics table
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_topics_category ON topics(category);

-- Call topics (many-to-many)
CREATE TABLE call_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_recording_id UUID REFERENCES call_recordings(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    relevance_score DECIMAL(5, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(call_recording_id, topic_id)
);

CREATE INDEX idx_call_topics_call ON call_topics(call_recording_id);
CREATE INDEX idx_call_topics_topic ON call_topics(topic_id);

-- Keywords table
CREATE TABLE keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word VARCHAR(100) UNIQUE NOT NULL,
    sentiment_type VARCHAR(20),
    frequency INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_keywords_frequency ON keywords(frequency DESC);
CREATE INDEX idx_keywords_sentiment ON keywords(sentiment_type);

-- Call keywords (many-to-many)
CREATE TABLE call_keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_recording_id UUID REFERENCES call_recordings(id) ON DELETE CASCADE,
    keyword_id UUID REFERENCES keywords(id) ON DELETE CASCADE,
    occurrence_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(call_recording_id, keyword_id)
);

CREATE INDEX idx_call_keywords_call ON call_keywords(call_recording_id);
CREATE INDEX idx_call_keywords_keyword ON call_keywords(keyword_id);

-- Sentiment timeline aggregations table
CREATE TABLE sentiment_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    time_bucket TIMESTAMPTZ NOT NULL,
    satisfied_count INTEGER DEFAULT 0,
    neutral_count INTEGER DEFAULT 0,
    frustrated_count INTEGER DEFAULT 0,
    angry_count INTEGER DEFAULT 0,
    total_interactions INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(time_bucket)
);

CREATE INDEX idx_sentiment_timeline_bucket ON sentiment_timeline(time_bucket DESC);

-- KPI metrics table
CREATE TABLE kpi_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(12, 2) NOT NULL,
    metric_unit VARCHAR(20),
    change_value DECIMAL(12, 2),
    change_type VARCHAR(20),
    time_period VARCHAR(20),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_kpi_metrics_name ON kpi_metrics(metric_name);
CREATE INDEX idx_kpi_metrics_recorded ON kpi_metrics(recorded_at DESC);

-- Performance metrics table
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_type VARCHAR(50) NOT NULL,
    file_format VARCHAR(10),
    avg_size VARCHAR(20),
    processing_time DECIMAL(6, 2),
    accuracy DECIMAL(5, 2),
    files_processed INTEGER DEFAULT 0,
    error_rate DECIMAL(5, 2),
    time_period VARCHAR(20),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_performance_metrics_type ON performance_metrics(metric_type);
CREATE INDEX idx_performance_metrics_format ON performance_metrics(file_format);
CREATE INDEX idx_performance_metrics_recorded ON performance_metrics(recorded_at DESC);

-- System health metrics table
CREATE TABLE system_health_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(50) NOT NULL,
    current_value DECIMAL(10, 2) NOT NULL,
    max_value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    warning_threshold DECIMAL(5, 2),
    critical_threshold DECIMAL(5, 2),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_system_health_name ON system_health_metrics(metric_name);
CREATE INDEX idx_system_health_recorded ON system_health_metrics(recorded_at DESC);

-- Alerts table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    severity VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    resolution TEXT,
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by UUID REFERENCES agents(id) ON DELETE SET NULL,
    acknowledged_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_acknowledged ON alerts(acknowledged);
CREATE INDEX idx_alerts_created ON alerts(created_at DESC);

-- Sentiment distribution aggregations table
CREATE TABLE sentiment_distribution (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sentiment_name VARCHAR(20) NOT NULL,
    count INTEGER DEFAULT 0,
    percentage DECIMAL(5, 2),
    time_period VARCHAR(20),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sentiment_distribution_sentiment ON sentiment_distribution(sentiment_name);
CREATE INDEX idx_sentiment_distribution_recorded ON sentiment_distribution(recorded_at DESC);

-- Correlation data table
CREATE TABLE correlation_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_x VARCHAR(100) NOT NULL,
    metric_y VARCHAR(100) NOT NULL,
    correlation_value DECIMAL(4, 2),
    sample_size INTEGER,
    time_period VARCHAR(20),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_correlation_metrics ON correlation_data(metric_x, metric_y);
CREATE INDEX idx_correlation_recorded ON correlation_data(recorded_at DESC);

-- Agent performance time series table
CREATE TABLE agent_performance_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    tickets_solved INTEGER DEFAULT 0,
    fcr_rate DECIMAL(5, 2),
    avg_handle_time DECIMAL(6, 2),
    performance_score DECIMAL(5, 2),
    csat_score DECIMAL(5, 2),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_perf_history_agent ON agent_performance_history(agent_id);
CREATE INDEX idx_agent_perf_history_recorded ON agent_performance_history(recorded_at DESC);

-- Trend alerts table
CREATE TABLE trend_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'info',
    metric_value DECIMAL(12, 2),
    threshold_value DECIMAL(12, 2),
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trend_alerts_type ON trend_alerts(alert_type);
CREATE INDEX idx_trend_alerts_detected ON trend_alerts(detected_at DESC);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_call_recordings_updated_at BEFORE UPDATE ON call_recordings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_keywords_updated_at BEFORE UPDATE ON keywords FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sentiment_timeline_updated_at BEFORE UPDATE ON sentiment_timeline FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();