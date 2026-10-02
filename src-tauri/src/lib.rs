pub mod part;
pub mod disk;

use std::sync::Arc;
use tokio::sync::RwLock;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadStatusUpdate {
    pub id: String,
    pub downloaded_bytes: u64,
    pub total_bytes: u64,
    pub speed: u64,
    pub status: String,
}

pub struct SingoEngine {
    // In-memory atomic registry of active tasks
    tasks: Arc<RwLock<Vec<DownloadStatusUpdate>>>,
}

impl SingoEngine {
    pub fn new() -> Self {
        Self {
            tasks: Arc::new(RwLock::new(Vec::new())),
        }
    }
}
