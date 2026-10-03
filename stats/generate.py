"""Generate the profile stats card (light and dark SVG) from real GitHub data.

Contributions and streaks come from the public contribution calendar, which includes
private work because the profile shows private contributions. Language shares come from
stats/languages.json, measured across every repository, private ones included, which a
workflow token can't see, so that file is refreshed by hand.

Usage: GITHUB_TOKEN=... python3 stats/generate.py
"""
import datetime
import json
import os
import pathlib
import urllib.request

LOGIN = "TheBraveByte"
HERE = pathlib.Path(__file__).parent

QUERY = """
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}"""

THEMES = {
    "light": {"bg": "#fafaf9", "edge": "#e2e1dd", "ink": "#111110", "muted": "#75746f", "faint": "#e7e6e3", "accent": "#d9480f",
              "langs": ["#d9480f", "#4d4c48", "#8a8984", "#b3b2ad", "#d9d8d4"]},
    "dark": {"bg": "#0e0e0d", "edge": "#292927", "ink": "#ededeb", "muted": "#8a8984", "faint": "#222220", "accent": "#ff8a4c",
             "langs": ["#ff8a4c", "#d0cfca", "#9a9994", "#6b6a66", "#3d3c39"]},
}
SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"


def calendar():
    body = json.dumps({"query": QUERY, "variables": {"login": LOGIN}}).encode()
    req = urllib.request.Request("https://api.github.com/graphql", data=body, headers={
        "Authorization": f"bearer {os.environ['GITHUB_TOKEN']}", "Content-Type": "application/json"})
    data = json.load(urllib.request.urlopen(req))["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    days = [d for w in data["weeks"] for d in w["contributionDays"]]
    return data["totalContributions"], days


def streaks(days):
    today = days[-1]["date"]
    current = 0
    for d in reversed(days):
        if d["contributionCount"] > 0:
            current += 1
        elif d["date"] == today:
            continue  # today isn't over yet
        else:
            break
    best = run = 0
    best_span = (None, None)
    start = None
    for d in days:
        if d["contributionCount"] > 0:
            run += 1
            start = start or d["date"]
            if run > best:
                best, best_span = run, (start, d["date"])
        else:
            run, start = 0, None
    return current, best, best_span


def fmt_day(iso):
    d = datetime.date.fromisoformat(iso)
    return f"{d.day} {d.strftime('%b')} {d.year}"


def card(theme, total, days, langs):
    t = THEMES[theme]
    current, best, (bs, be) = streaks(days)
    active = sum(1 for d in days if d["contributionCount"] > 0)

    # 52 weekly totals as a quiet activity strip
    weeks = [sum(d["contributionCount"] for d in days[i:i + 7]) for i in range(max(0, len(days) - 364), len(days), 7)]
    peak = max(weeks) or 1
    bar_w, gap, strip_h = 3, 1.6, 34  # 52 weeks fit the first column (about 240px)
    strip = "".join(
        f'<rect x="{32 + i * (bar_w + gap):.1f}" y="{150 - max(2, round(strip_h * w / peak))}" width="{bar_w}" '
        f'height="{max(2, round(strip_h * w / peak))}" rx="1.5" fill="{t["accent"] if w else t["faint"]}" opacity="{0.35 + 0.65 * w / peak:.2f}"/>'
        for i, w in enumerate(weeks))

    # commits by language: one stacked bar plus a legend
    x, segs, legend = 560, "", ""
    width = 208
    for i, l in enumerate(langs["languages"]):
        w = width * l["share"] / 100
        segs += f'<rect x="{x:.1f}" y="74" width="{max(w - 1.5, 1):.1f}" height="8" fill="{t["langs"][i]}"/>'
        x += w
    for i, l in enumerate(langs["languages"]):
        ly = 104 + i * 15
        legend += (f'<rect x="560" y="{ly - 7}" width="7" height="7" rx="1.5" fill="{t["langs"][i]}"/>'
                   f'<text x="573" y="{ly}" font-family="{SANS}" font-size="11.5" fill="{t["ink"]}">{l["name"]}</text>'
                   f'<text x="768" y="{ly}" text-anchor="end" font-family="{MONO}" font-size="11" fill="{t["muted"]}">{l["share"]:.0f}%</text>')

    updated = fmt_day(days[-1]["date"])
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200" role="img" aria-labelledby="t d">
<title id="t">Yusuf Akinleye on GitHub</title>
<desc id="d">{total:,} contributions in the last year, active on {active} of {len(days)} days. Current streak {current} days, longest {best} days. Commits by language: {", ".join(f'{l["name"]} {l["share"]:.0f}%' for l in langs["languages"])}.</desc>
<rect x="0.5" y="0.5" width="799" height="199" rx="8" fill="{t["bg"]}" stroke="{t["edge"]}"/>
<text x="32" y="44" font-family="{SANS}" font-size="12" fill="{t["muted"]}">Contributions, last 12 months</text>
<text x="32" y="86" font-family="{SANS}" font-size="38" font-weight="600" fill="{t["ink"]}" letter-spacing="-1">{total:,}</text>
<text x="32" y="108" font-family="{SANS}" font-size="12" fill="{t["muted"]}">Active on {active} of {len(days)} days</text>
{strip}
<line x1="300" y1="32" x2="300" y2="168" stroke="{t["edge"]}"/>
<text x="328" y="44" font-family="{SANS}" font-size="12" fill="{t["muted"]}">Current streak</text>
<text x="328" y="78" font-family="{SANS}" font-size="28" font-weight="600" fill="{t["ink"]}">{current} <tspan font-size="14" font-weight="400" fill="{t["muted"]}">days</tspan></text>
<text x="328" y="120" font-family="{SANS}" font-size="12" fill="{t["muted"]}">Longest streak</text>
<text x="328" y="148" font-family="{SANS}" font-size="20" font-weight="600" fill="{t["ink"]}">{best} <tspan font-size="13" font-weight="400" fill="{t["muted"]}">days</tspan></text>
<text x="328" y="166" font-family="{MONO}" font-size="10.5" fill="{t["muted"]}">{fmt_day(bs)} to {fmt_day(be)}</text>
<line x1="532" y1="32" x2="532" y2="168" stroke="{t["edge"]}"/>
<text x="560" y="44" font-family="{SANS}" font-size="12" fill="{t["muted"]}">Commits by language</text>
<text x="560" y="60" font-family="{MONO}" font-size="10.5" fill="{t["muted"]}">{langs["total_commits"]:,} commits, all repositories</text>
{segs}
{legend}
<text x="768" y="186" text-anchor="end" font-family="{MONO}" font-size="9.5" fill="{t["muted"]}">updated {updated}</text>
</svg>
"""


def main():
    total, days = calendar()
    langs = json.loads((HERE / "languages.json").read_text())
    for theme in THEMES:
        (HERE / f"card-{theme}.svg").write_text(card(theme, total, days, langs))
    print(f"{total:,} contributions; cards written")


if __name__ == "__main__":
    main()
