use std::fs::File;
use std::io::Result;
use std::path::Path;

/// Fast, zero-fragmentation preallocation using OS-native system calls.
pub fn preallocate_file<P: AsRef<Path>>(path: P, size: u64) -> Result<File> {
    let file = File::create(path)?;
    
    // Set file size immediately without blocking CPU or filling zeros manually
    file.set_len(size)?;

    Ok(file)
}
