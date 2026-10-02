use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct DownloadPart {
    pub id: usize,
    pub from: u64,
    pub to: u64,
    pub current: u64,
}

impl DownloadPart {
    pub fn new(id: usize, from: u64, to: u64) -> Self {
        Self {
            id,
            from,
            to,
            current: from,
        }
    }

    pub fn is_completed(&self) -> bool {
        self.current >= self.to
    }

    pub fn remaining(&self) -> u64 {
        if self.current >= self.to {
            0
        } else {
            self.to - self.current
        }
    }

    /// IDM-style dynamic part splitting:
    /// Halves the remaining unallocated byte range to spawn a new concurrent worker.
    pub fn split(&mut self, new_id: usize, min_chunk_size: u64) -> Option<DownloadPart> {
        let remaining = self.remaining();
        if remaining < min_chunk_size * 2 {
            return None;
        }

        let half = remaining / 2;
        let original_to = self.to;
        self.to = self.current + half;

        Some(DownloadPart::new(new_id, self.to + 1, original_to))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_splitting() {
        let mut part = DownloadPart::new(1, 0, 1000);
        part.current = 200; // 800 remaining

        let new_part = part.split(2, 100).expect("Should split successfully");
        assert_eq!(part.from, 0);
        assert_eq!(part.to, 600);
        assert_eq!(new_part.from, 601);
        assert_eq!(new_part.to, 1000);
    }
}
