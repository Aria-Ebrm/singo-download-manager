use std::io::{self, Read, Write};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct NativeMessage {
    url: String,
    filename: Option<String>,
}

#[derive(Serialize)]
struct NativeResponse {
    status: String,
    message: String,
}

fn main() -> io::Result<()> {
    let mut stdin = io::stdin().lock();
    let mut stdout = io::stdout().lock();

    loop {
        // Read 32-bit length prefix (native messaging standard)
        let mut len_bytes = [0u8; 4];
        if stdin.read_exact(&mut len_bytes).is_err() {
            break;
        }

        let length = u32::from_ne_bytes(len_bytes) as usize;
        let mut msg_buf = vec![0u8; length];
        stdin.read_exact(&mut msg_buf)?;

        if let Ok(msg) = serde_json::from_slice::<NativeMessage>(&msg_buf) {
            let response = NativeResponse {
                status: "ok".to_string(),
                message: format!("Queued download for: {}", msg.url),
            };

            let res_bytes = serde_json::to_vec(&response).unwrap();
            let res_len = (res_bytes.len() as u32).to_ne_bytes();

            stdout.write_all(&res_len)?;
            stdout.write_all(&res_bytes)?;
            stdout.flush()?;
        }
    }

    Ok(())
}
