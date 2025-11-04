import { Article } from '../types';

const articles: Article[] = [
  {
    id: '1',
    title: 'Restoring GitLab Stacked Diffs: A Deep Dive',
    date: '2024-10-12',
    slug: 'diffrewind-restoring',
    content: `# Restoring GitLab Stacked Diffs: A Deep Dive

## Before Starting

If you're reading this article, I assume you're already familiar with GitLab stacked diffs. If you don't care about how GitLab handles stacked diffs internally, jump to **"Let's dive in with DiffRewind"**.

However, if you're not well-versed in this topic, I highly recommend checking out this excellent article by Gergely Orosz: _Stacked Diffs_. It provides a comprehensive overview and is definitely worth your time.

## The Challenge of Local Storage

While stacked diffs offer numerous benefits, they come with a unique challenge: they're stored **locally** in your repository. This means they aren't automatically shared when you clone a GitLab repo, making restoration and sharing across environments potentially tricky.

## Why Restoration Matters

Understanding how to restore stacked diffs is crucial for:

- Recovering work after switching machines  
- Collaborating on complex features  
- Ensuring continuity in your development process  

In this guide, we'll explore effective strategies for restoring GitLab stacked diffs, empowering you to manage your incremental changes with confidence.

## Where Are Stacked Diffs Saved?

Stacked diffs are stored locally in your Git repository, specifically in:

\`\`\`
{repository_dir}/.git/stacked/{stacked_diff_name}/
\`\`\`

## Internal Branch Naming

To developers, it may appear you're working with a single branch, but GitLab internally creates a branch for each MR, using the following format:

\`\`\`
{author}-{stacked_diff_name}-{short_sha}
\`\`\`

Example:

\`\`\`
idan-feature-update-52d754b9
\`\`\`

This structure gives you:

- The author (\`idan\`)
- The name of the stacked diff (\`feature-update\`)
- A short SHA for identification (\`52d754b9\`)

## Branch Storage Format

Each branch in a stacked diff is saved as a JSON file in the stacked diff folder.

### Filename format:
\`\`\`
{short_sha}.json
\`\`\`

Example:  
For the branch \`idan-feature-update-52d754b9\`, the file would be:

\`\`\`
52d754b9.json
\`\`\`

### JSON structure:

\`\`\`json
{
  "prev": "previous_stacked_diff_sha",
  "branch": "author-stackedDiff-name-short_sha",
  "sha": "current_stacked_diff_sha",
  "next": "next_stacked_diff_sha",
  "mr": "merge_request_url",
  "description": "merge_request_description"
}
\`\`\`

## Stack Data Structure

It's important to note that these branches are organized in a stack data structure. Each branch (represented by a JSON file) points to the previous and next branches in the stack, allowing for efficient traversal and management of the stacked diffs.

Understanding this storage mechanism and naming convention is key to effectively restoring and managing your stacked diffs in GitLab.
Restoring Stacked Diffs

Restoring a stacked diff involves recreating the branch structure and updating Git's configuration. 

1. Initiate Stacked Diff Restoration
\`\`\`bash
glab stack create
\`\`\`

When prompted, enter the name of the stacked diff you want to restore.

2. Understanding Git's Branch Configuration

Git stores information about all branches (including remote and merge paths) in the git-project/.git/config file. Each branch entry in this file follows this format:
\`\`\`
[branch "branch-name"]
remote = remote-name
merge = refs/heads/branch-name
\`\`\`

For each branch in your stacked diff, you need to add an entry to the git-project.git/config file. Here's how to do it:

\`\`\`
[branch "author-stackedDiff-name-short-sha"]
remote = {remote-name}
merge = refs/heads/author-stackedDiff-name-short-sha
\`\`\`

3. Specifying the Current Stack

After adding all branch entries, you need to specify which stack you're currently working on. Add the following section to your git-project.git/config file:

\`\`\`
[glab]
currentstack = your-stack-name
\`\`\`

4. Recreating Branch References

For each branch in your stacked diff, you also need to create a file in the git-project.git/refs/heads/ directory:

Navigate to the git-project.git/refs/heads/ directory

Create a new file with the branch name, In this file, add the SHA of the branch.
Lets dive in with DiffRewind

While the manual process described above gives you a deep understanding of how stacked diffs are restored, it can be time-consuming and prone to errors. This is the reason I have created DiffRewind. DiffRewind is a CLI tool that was specifically created to simplify the restoration of stacked diffs. It automates all the steps we've discussed, making the process of restoring your stacked diffs quick and error-free.

Installation

1) Clone the repository:
\`\`\`bash
git clone https://github.com/IdanKoblik/DiffRewind.git
cd DiffRewind
\`\`\`

2) Install dependencies:
\`\`\`bash
pip3 install -r requirements.txt
\`\`\`

## Usage
To restore a stacked diff, use the following command:

\`\`\`bash
python3 main.py <path_to_repo>
\`\`\`

* Replace <path_to_repo> with the path to your GitLab project.
` },
];

export async function fetchArticles(): Promise<Article[]> {
  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find(article => article.slug === slug) || null;
}

function parseMarkdownToHTML(markdown: string): string {
  let html = markdown;

  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>');

  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>');

  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">$1</code>');

  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

  html = html.replace(/^(?!<[hl]|<pre|<li|<code)(.*$)/gim, '<p class="mb-4 leading-relaxed">$1</p>');

  return html;
}

export { parseMarkdownToHTML };
